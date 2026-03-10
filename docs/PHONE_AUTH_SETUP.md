# Firebase Phone Authentication Setup Guide

This document provides instructions for completing the Firebase Phone Authentication setup.

## Prerequisites

Before running the application, complete these steps:

### 1. Install Python Dependencies

```bash
cd backend
pip install firebase-admin
```

### 2. Run Database Migrations

```bash
cd backend
python manage.py makemigrations users
python manage.py migrate
```

### 3. Get Firebase Service Account JSON

To use Firebase Admin SDK on the backend, you need a service account:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `roomsetu-c5136`
3. Go to **Project Settings** (gear icon)
4. Navigate to **Service Accounts** tab
5. Click **Generate new private key**
6. Save the downloaded JSON file as `firebase-service-account.json` in the `backend/` folder

### 4. Enable Phone Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `roomsetu-c5136`
3. Go to **Authentication** in the left sidebar
4. Click **Get Started**
5. Go to **Sign-in method** tab
6. Enable **Phone** provider

### 5. Configure Phone Provider Settings

1. In Firebase Console > Authentication > Sign-in method
2. Click on **Phone**
3. Add your phone number to the **Authorized phone numbers** for testing
4. Optionally enable **reCAPTCHA** protection

---

## API Endpoints

### POST /api/auth/verify-phone-login/

Verifies Firebase ID token and checks if user exists.

**Request:**
```json
{
  "id_token": "Firebase_ID_Token",
  "phone_number": "+919876543210"
}
```

**Response (Existing User):**
```json
{
  "exists": true,
  "user": { ... },
  "needs_role_selection": false,
  "message": "Login successful"
}
```

**Response (New User):**
```json
{
  "exists": false,
  "phone_number": "+919876543210",
  "firebase_uid": "firebase_uid_here",
  "needs_role_selection": true,
  "message": "Phone verified. Please select your role."
}
```

### POST /api/auth/save-role/

Saves user role after phone authentication.

**Request:**
```json
{
  "phone_number": "+919876543210",
  "firebase_uid": "firebase_uid_here",
  "role": "owner",
  "name": "John Doe",
  "city": "Pune"
}
```

**Response:**
```json
{
  "user": { ... },
  "message": "Account created successfully",
  "redirect_url": "/owner-dashboard/"
}
```

### POST /api/auth/check-phone/

Checks if a phone number exists in the database.

**Request:**
```json
{
  "phone_number": "+919876543210"
}
```

**Response:**
```json
{
  "exists": true
}
```

---

## Frontend Flow

1. User clicks phone icon on login page
2. PhoneAuth component opens
3. User enters phone number
4. OTP is sent via Firebase
5. User enters OTP
6. Firebase verifies OTP and returns ID token
7. Frontend calls `/api/auth/verify-phone-login/`
8. If user exists → login and redirect to dashboard
9. If new user → show role selection (Owner/User)
10. After role selection → call `/api/auth/save-role/`
11. Redirect to role-based dashboard

---

## Security Considerations

1. **OTP Verification Required**: OTP must be verified before account creation
2. **Token Validation**: Backend verifies Firebase ID token using Admin SDK
3. **CSRF Protection**: All endpoints use CSRF tokens
4. **Session Management**: Django sessions are used for authenticated users

---

## Troubleshooting

### Issue: "Firebase credentials not found"

**Solution**: Ensure `firebase-service-account.json` is in the `backend/` folder

### Issue: "Invalid ID token"

**Solution**: 
- Ensure phone authentication is enabled in Firebase Console
- Check that the recaptcha is configured correctly

### Issue: "Phone number not found in token"

**Solution**: This may happen with some Firebase configurations. The backend will try to use the phone number from the request body as fallback.

---

## Testing Phone Login

1. Complete setup steps above
2. Start Django backend: `python manage.py runserver`
3. Start React frontend: `npm run dev`
4. Click phone icon on login page
5. Enter your phone number (must be in authorized numbers for testing)
6. Enter OTP
7. Select role
8. You should be redirected to dashboard

