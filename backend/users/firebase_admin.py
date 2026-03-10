"""
Firebase Admin SDK Setup for Django Backend
This module initializes Firebase Admin for server-side token verification
"""

import os
import json
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

# Firebase Admin instance (singleton)
_firebase_admin = None


def get_firebase_admin():
    """
    Get or initialize Firebase Admin SDK instance.
    Uses service account or application default credentials.
    """
    global _firebase_admin
    
    if _firebase_admin is not None:
        return _firebase_admin
    
    try:
        import firebase_admin
        from firebase_admin import credentials
        
        # Check for Firebase credentials in settings
        firebase_creds = getattr(settings, 'FIREBASE_CONFIG', None)
        
        if firebase_creds:
            # Use credentials from settings (dict format)
            cred = credentials.Certificate(firebase_creds)
        else:
            # Try to load from environment variable (JSON string)
            firebase_json = os.environ.get('FIREBASE_SERVICE_ACCOUNT_JSON')
            if firebase_json:
                cred_dict = json.loads(firebase_json)
                cred = credentials.Certificate(cred_dict)
            else:
                # Try to load from file
                service_account_path = getattr(settings, 'FIREBASE_SERVICE_ACCOUNT_PATH', None)
                if service_account_path and os.path.exists(service_account_path):
                    cred = credentials.Certificate(service_account_path)
                else:
                    logger.warning("Firebase credentials not found. Phone auth may not work.")
                    return None
        
        # Initialize Firebase Admin
        _firebase_admin = firebase_admin.initialize_app(cred)
        logger.info("Firebase Admin SDK initialized successfully")
        return _firebase_admin
        
    except Exception as e:
        logger.error(f"Failed to initialize Firebase Admin: {str(e)}")
        return None


def verify_firebase_token(id_token: str) -> dict:
    """
    Verify a Firebase ID token and return the decoded claims.
    
    Args:
        id_token: Firebase ID token from client
        
    Returns:
        dict: Decoded token claims including:
            - uid: Firebase user ID
            - phone_number: User's phone number
            - email: User's email (if available)
            - email_verified: Whether email is verified
            - sign_in_provider: The sign-in provider used
            
    Raises:
        ValueError: If token is invalid or expired
        firebase_admin.auth.InvalidIdTokenError: If token is malformed
        firebase_admin.auth.ExpiredIdTokenError: If token has expired
    """
    from firebase_admin import auth
    
    try:
        # Verify the token
        decoded_token = auth.verify_id_token(id_token)
        
        return {
            'uid': decoded_token.get('uid'),
            'phone_number': decoded_token.get('phone_number'),
            'email': decoded_token.get('email'),
            'email_verified': decoded_token.get('email_verified', False),
            'sign_in_provider': decoded_token.get('sign_in_provider', 'phone'),
            'firebase_uid': decoded_token.get('uid'),  # Alias for uid
        }
        
    except auth.InvalidIdTokenError as e:
        logger.error(f"Invalid Firebase ID token: {str(e)}")
        raise ValueError("Invalid ID token")
        
    except auth.ExpiredIdTokenError as e:
        logger.error(f"Expired Firebase ID token: {str(e)}")
        raise ValueError("Token has expired")
        
    except auth.RevokedIdTokenError as e:
        logger.error(f"Revoked Firebase ID token: {str(e)}")
        raise ValueError("Token has been revoked")
        
    except Exception as e:
        logger.error(f"Firebase token verification error: {str(e)}")
        raise ValueError(f"Token verification failed: {str(e)}")


def get_user_by_phone(phone_number: str) -> dict:
    """
    Get Firebase user by phone number.
    
    Args:
        phone_number: User's phone number
        
    Returns:
        dict: User data from Firebase
    """
    from firebase_admin import auth
    
    try:
        user = auth.get_user_by_phone_number(phone_number)
        return {
            'uid': user.uid,
            'phone_number': user.phone_number,
            'email': user.email,
            'email_verified': user.email_verified,
            'disabled': user.disabled,
            'metadata': {
                'created_at': user.user_metadata.creation_timestamp,
                'last_sign_in': user.user_metadata.last_sign_in_timestamp,
            }
        }
    except auth.UserNotFoundError:
        return None
    except Exception as e:
        logger.error(f"Error getting Firebase user by phone: {str(e)}")
        return None


def create_custom_token(uid: str, additional_claims: dict = None) -> str:
    """
    Create a custom Firebase token for a user.
    
    Args:
        uid: User's unique ID
        additional_claims: Optional custom claims to add to the token
        
    Returns:
        str: Custom token string
    """
    from firebase_admin import auth
    
    try:
        custom_token = auth.create_custom_token(
            uid=uid,
            additional_claims=additional_claims or {}
        )
        return custom_token.decode('utf-8') if isinstance(custom_token, bytes) else custom_token
    except Exception as e:
        logger.error(f"Error creating custom token: {str(e)}")
        raise ValueError(f"Failed to create custom token: {str(e)}")


# Initialize on module import
get_firebase_admin()

