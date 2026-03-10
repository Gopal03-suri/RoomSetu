# Signup Feature Documentation

## Overview
Added user registration (signup) functionality to both frontend and backend.

## Frontend Changes (App.jsx)

### New State Variables
- `isSignup`: Toggle between login and signup forms
- `name`: User's full name
- `city`: User's city
- `role`: User role (tenant/owner/agent)

### New UI Elements
1. **Signup Form Fields**:
   - Full Name (text input)
   - Email (email input)
   - Password (password input)
   - City (text input)
   - Role (dropdown: Tenant, Owner, Field Agent)

2. **Toggle Button**:
   - "Don't have an account? Sign Up" (on login page)
   - "Already have an account? Sign In" (on signup page)

### Signup Flow
1. User clicks "Sign Up" toggle
2. Fills in: Name, Email, Password, City, Role
3. Submits form
4. Avatar is auto-generated from initials
5. User is automatically logged in

## Backend Changes

### 1. Serializer (users/serializers.py)
Added `SignupSerializer`:
```python
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'role', 'city', 'phone']
    
    def create(self, validated_data):
        user = User.objects.create_user(...)
        return user
```

### 2. View (users/views.py)
Added `signup_view`:
```python
@api_view(['POST'])
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
```

### 3. URL (users/urls.py)
Added route:
```python
path('signup/', signup_view, name='signup'),
```

## API Endpoint

### POST /api/auth/signup/

**Request Body**:
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "first_name": "New",
  "last_name": "User",
  "role": "tenant",
  "city": "Mumbai",
  "phone": "9876543210"
}
```

**Response (201 Created)**:
```json
{
  "user": {
    "id": 5,
    "username": "newuser",
    "email": "newuser@example.com",
    "first_name": "New",
    "last_name": "User",
    "role": "tenant",
    "city": "Mumbai",
    "phone": "9876543210"
  },
  "message": "Account created successfully"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "username": ["This field is required."],
  "email": ["User with this email already exists."]
}
```

## Testing

### Using Test Script
```bash
cd backend
python test_signup.py
```

### Using Postman
1. Import `RoomSetu_API.postman_collection.json`
2. Navigate to Authentication → Signup
3. Send request with sample data

### Manual Testing
1. Start backend: `python manage.py runserver`
2. Start frontend: `npm run dev`
3. Go to login page
4. Click "Don't have an account? Sign Up"
5. Fill in the form
6. Submit and verify auto-login

## Features
- ✅ Password hashing (Django's built-in)
- ✅ Email validation
- ✅ Role selection (tenant/owner/agent)
- ✅ Auto-login after signup
- ✅ Avatar auto-generation from initials
- ✅ Form validation
- ✅ Error handling
- ✅ Responsive design

## Security Notes
- Passwords are hashed using Django's `create_user()` method
- Email uniqueness is enforced at database level
- CSRF protection enabled (Django default)
- Session-based authentication

## Future Enhancements
- Email verification
- Password strength validation
- Phone number verification (OTP)
- Social login (Google, Facebook)
- Profile picture upload
- Terms & conditions checkbox
