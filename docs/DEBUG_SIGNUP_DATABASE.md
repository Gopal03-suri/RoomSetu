# 🔍 Signup Not Saving to Database - Debug Guide

## Problem
Signup appears to work but data is NOT saved to `db.sqlite3` database.

## Root Cause
Frontend is using **fallback mode** (local storage) instead of calling backend API due to network error.

## ✅ Step-by-Step Fix

### Step 1: Verify Backend is Running
```bash
cd backend
python manage.py runserver
```

**Expected output:**
```
Starting development server at http://127.0.0.1:8000/
```

**Test it:** Open http://127.0.0.1:8000/ in browser
- Should see: "RoomSetu API is running! 🏠"

### Step 2: Test Signup API Directly

**Option A - Using curl (Windows):**
Double-click `test_signup_api.bat` in the root folder

**Option B - Using PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/auth/signup/" -Method POST -ContentType "application/json" -Body '{"username":"testuser","email":"test@example.com","password":"test123","first_name":"Test","last_name":"User","role":"tenant","city":"Mumbai","phone":""}'
```

**Expected response:**
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    ...
  },
  "message": "Account created successfully"
}
```

### Step 3: Verify Data in Database

**Option A - Django Shell:**
```bash
cd backend
python manage.py shell
```

Then:
```python
from users.models import User
print(User.objects.all())
print(User.objects.count())
```

**Option B - SQL Viewer:**
1. Open `backend/db.sqlite3` in SQL viewer
2. Look at `users_user` table
3. Should see the new user

### Step 4: Check Frontend Connection

1. **Start frontend:**
   ```bash
   cd roomsetu
   npm run dev
   ```

2. **Open browser console (F12)**

3. **Try signup** and watch console for:
   - "Sending signup request..." ✅
   - "Signup successful: {...}" ✅
   - OR error message ❌

### Step 5: Common Issues & Fixes

#### Issue 1: "Cannot connect to backend"
**Cause:** Backend not running or wrong port
**Fix:** 
- Make sure backend is running on port 8000
- Check `roomsetu/src/api.js` has: `http://localhost:8000/api`

#### Issue 2: CORS Error
**Cause:** Frontend port not allowed
**Fix:** In `backend/roomsetu_backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',  # Vite default
]
```

#### Issue 3: CSRF Error
**Cause:** CSRF token missing
**Fix:** Already fixed - signup endpoint is CSRF exempt

#### Issue 4: "Username already exists"
**Cause:** Email already used (username derived from email)
**Fix:** Use a different email address

## 🎯 Quick Verification Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173 or 3000
- [ ] Can access http://127.0.0.1:8000/ (shows welcome message)
- [ ] `test_signup_api.bat` works (creates user)
- [ ] Browser console shows "Sending signup request..."
- [ ] No CORS errors in console
- [ ] User appears in `users_user` table

## 📊 Expected Flow

1. User fills signup form
2. Frontend calls `api.signup()`
3. POST request to `http://localhost:8000/api/auth/signup/`
4. Backend validates data
5. Backend creates user in database
6. Backend returns user data
7. Frontend logs user in
8. User redirected to dashboard

## 🔧 If Still Not Working

### Check Backend Logs
Look at terminal where `python manage.py runserver` is running.
You should see:
```
POST /api/auth/signup/ HTTP/1.1" 201
```

If you see `404` or `500`, there's a backend error.

### Check Frontend Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Try signup
4. Look for request to `signup/`
5. Check:
   - Status: Should be 201
   - Response: Should have user data
   - Request payload: Should have all fields

### Enable Debug Mode
In `roomsetu/src/App.jsx`, the signup now logs:
- "Sending signup request..." - Request started
- "Signup successful: {...}" - Request succeeded
- Error details if failed

## ✅ Success Indicators

When working correctly:
1. ✅ No error message shown
2. ✅ Console shows "Signup successful"
3. ✅ Automatically logged in
4. ✅ User in database (check with Django shell)
5. ✅ Can login again with same credentials

## 🆘 Still Having Issues?

Run this diagnostic:
```bash
cd backend
python manage.py shell
```

```python
from users.models import User
from django.contrib.auth import get_user_model

# Check model
print("User model:", get_user_model())

# Try creating user manually
user = User.objects.create_user(
    username='manualtest',
    email='manual@test.com',
    password='test123',
    first_name='Manual',
    last_name='Test',
    role='tenant',
    city='Mumbai'
)
print("Created:", user)

# Verify it saved
print("Total users:", User.objects.count())
```

If this works, the backend is fine - issue is in frontend connection.
