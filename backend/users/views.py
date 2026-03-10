from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import User
from .serializers import UserSerializer, LoginSerializer, SignupSerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@csrf_exempt
def signup_view(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Account created successfully'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request, user)
                return Response({
                    'user': UserSerializer(user).data,
                    'message': 'Login successful'
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@csrf_exempt
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful'})

@api_view(['GET'])
def current_user(request):
    if request.user.is_authenticated:
        return Response(UserSerializer(request.user).data)
    return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@csrf_exempt
def check_user_view(request):
    """Check if a user exists by email in the Django backend"""
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        return Response({
            'exists': True,
            'user': UserSerializer(user).data
        })
    except User.DoesNotExist:
        return Response({'exists': False})


@api_view(['POST'])
@csrf_exempt
def verify_phone_login(request):
    """
    Verify Firebase ID token for phone authentication.
    
    Request body:
        - id_token: Firebase ID token from client
        - phone_number: Phone number (optional, extracted from token if not provided)
        
    Response:
        - exists: Whether phone number already exists in database
        - user: User data if exists
        - needs_role_selection: Whether user needs to select a role
        - message: Status message
    """
    id_token = request.data.get('id_token')
    
    if not id_token:
        return Response(
            {'error': 'ID token is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Import Firebase admin functions
        from .firebase_admin import verify_firebase_token
        
        # Verify the Firebase token
        firebase_data = verify_firebase_token(id_token)
        
        phone_number = request.data.get('phone_number') or firebase_data.get('phone_number')
        firebase_uid = firebase_data.get('uid') or firebase_data.get('firebase_uid')
        
        if not phone_number:
            return Response(
                {'error': 'Phone number not found in token'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not firebase_uid:
            return Response(
                {'error': 'UID not found in token'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Normalize phone number (remove spaces and special chars, keep +)
        phone_number = phone_number.strip()
        
        logger.info(f"Phone login attempt: phone={phone_number}, firebase_uid={firebase_uid}")
        
        # Check if user exists with this phone number
        user = User.objects.filter(phone_number=phone_number).first()
        
        if user:
            # User exists - update Firebase UID if not set
            if not user.firebase_uid:
                user.firebase_uid = firebase_uid
                user.save(update_fields=['firebase_uid'])
            
            # Log the user in
            login(request, user)
            
            # Check if role is set
            needs_role = not user.role or user.role == 'tenant'
            
            return Response({
                'exists': True,
                'user': UserSerializer(user).data,
                'needs_role_selection': needs_role,
                'message': 'Login successful'
            })
        else:
            # New user - return info for role selection
            return Response({
                'exists': False,
                'phone_number': phone_number,
                'firebase_uid': firebase_uid,
                'needs_role_selection': True,
                'message': 'Phone verified. Please select your role.'
            })
            
    except ValueError as e:
        logger.error(f"Token verification failed: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        logger.error(f"Phone login error: {str(e)}")
        return Response(
            {'error': 'Authentication failed. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@csrf_exempt
def save_role(request):
    """
    Save user role after phone authentication.
    
    Request body:
        - phone_number: User's phone number
        - firebase_uid: Firebase UID
        - role: Selected role (owner/user)
        - name: Optional name
        - city: Optional city
        
    Response:
        - user: Created user data
        - message: Success message
        - redirect_url: Dashboard URL based on role
    """
    phone_number = request.data.get('phone_number')
    firebase_uid = request.data.get('firebase_uid')
    role = request.data.get('role')
    name = request.data.get('name', '')
    city = request.data.get('city', '')
    
    # Validate required fields
    if not phone_number:
        return Response(
            {'error': 'Phone number is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not firebase_uid:
        return Response(
            {'error': 'Firebase UID is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if not role:
        return Response(
            {'error': 'Role is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate role
    valid_roles = ['owner', 'tenant', 'user']
    if role not in valid_roles:
        return Response(
            {'error': f'Invalid role. Must be one of: {", ".join(valid_roles)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Check if user already exists
        user = User.objects.filter(phone_number=phone_number).first()
        
        if user:
            # Update existing user role
            user.role = role
            if city:
                user.city = city
            user.save(update_fields=['role', 'city'])
            
            login(request, user)
            
            redirect_url = f'/owner-dashboard/' if role == 'owner' else f'/user-dashboard/'
            
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Role saved successfully',
                'redirect_url': redirect_url
            })
        
        # Create new user
        # Generate username from phone number
        username = f"user_{phone_number.replace('+', '').replace(' ', '').replace('-', '')}"
        
        # Ensure unique username
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        
        # Create user with random password (user won't use password to login)
        import random
        import string
        temp_password = ''.join(random.choices(string.ascii_letters + string.digits, k=20))
        
        user = User.objects.create_user(
            username=username,
            email=f"{username}@roomsetu.local",  # Local email since we don't have email
            password=temp_password,
            phone_number=phone_number,
            firebase_uid=firebase_uid,
            role=role,
            city=city,
            first_name=name.split()[0] if name else '',
            last_name=' '.join(name.split()[1:]) if len(name.split()) > 1 else ''
        )
        
        # Log the user in
        login(request, user)
        
        redirect_url = f'/owner-dashboard/' if role == 'owner' else f'/user-dashboard/'
        
        logger.info(f"New user created: phone={phone_number}, role={role}")
        
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Account created successfully',
            'redirect_url': redirect_url
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        logger.error(f"Save role error: {str(e)}")
        return Response(
            {'error': f'Failed to save role: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@csrf_exempt
def check_phone_exists(request):
    """
    Check if a phone number already exists in the database.
    
    Request body:
        - phone_number: Phone number to check
        
    Response:
        - exists: Whether phone number exists
    """
    phone_number = request.data.get('phone_number')
    
    if not phone_number:
        return Response(
            {'error': 'Phone number is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    exists = User.objects.filter(phone_number=phone_number).exists()
    
    return Response({'exists': exists})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

