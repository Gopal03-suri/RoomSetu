# 🔧 Signup Troubleshooting Guide

## Common "Signup Failed" Errors

### 1. Backend Not Running ❌
**Error**: "Signup failed. Check if backend is running."
**Solution**: 
```bash
cd backend
python manage.py runserver
```
**Note**: Frontend now has fallback mode - it will work locally even if backend is down.

### 2. CORS Error 🚫
**Error in Console**: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution**: Backend settings.py already configured for ports 3000 and 5173.
Check your frontend is running on one of these ports.

### 3. CSRF Token Error 🔒
**Error**: "CSRF token missing or incorrect"
**Solution**: Already fixed - signup endpoint is CSRF exempt.

### 4. Username Already Exists 👤
**Error**: "A user with that username already exists"
**Solution**: Try a different email (username is derived from email).

### 5. Network Error 🌐
**Error**: TypeError: Failed to fetch
**Solution**: 
- Check backend is running on port 8000
- Check frontend can reach `http://localhost:8000`
- Fallback mode will activate automatically

## Quick Diagnostic Steps

### Step 1: Check Backend Status
```bash
# Open browser and go to:
http://localhost:8000/api/auth/signup/
```
Should show: "Method GET not allowed" (this is good - means endpoint exists)

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try signup
4. Look for error messages

### Step 3: Test API Directly
```bash
curl -X POST http://localhost:8000/api/auth/signup/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "first_name": "Test",
    "last_name": "User",
    "role": "tenant",
    "city": "Mumbai",
    "phone": ""
  }'
```

### Step 4: Check Backend Logs
Look at the terminal where `python manage.py runserver` is running.
You should see POST requests to `/api/auth/signup/`

## Error Messages Decoded

| Error Message | Meaning | Fix |
|--------------|---------|-----|
| "All fields are required" | Missing form data | Fill all fields |
| "A user with that username already exists" | Email already used | Use different email |
| "This field is required" | Backend validation | Check all fields filled |
| "Signup failed. Check if backend is running" | Can't reach backend | Start backend server |
| Network error | Connection issue | Check ports and firewall |

## Testing Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173 or 3000
- [ ] Browser console shows no CORS errors
- [ ] All form fields filled
- [ ] Email not already registered
- [ ] Password meets requirements (if any)

## Manual Test

1. **Start Backend**:
   ```bash
   cd backend
   python manage.py runserver
   ```
   Should see: "Starting development server at http://127.0.0.1:8000/"

2. **Start Frontend**:
   ```bash
   cd roomsetu
   npm run dev
   ```
   Should see: "Local: http://localhost:5173/"

3. **Test Signup**:
   - Name: "John Doe"
   - Email: "john@test.com"
   - Password: "test123"
   - City: "Mumbai"
   - Role: "Tenant"

4. **Check Console**:
   - Should see: "Account created successfully" OR
   - Should see specific error message

## Still Not Working?

### Check Backend URL
In `roomsetu/src/api.js`, verify:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### Check CORS Settings
In `backend/roomsetu_backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
]
CORS_ALLOW_CREDENTIALS = True
```

### Restart Everything
```bash
# Stop both servers (Ctrl+C)
# Clear browser cache
# Restart backend
cd backend
python manage.py runserver

# Restart frontend (new terminal)
cd roomsetu
npm run dev
```

## Success Indicators ✅

When signup works correctly:
1. No error message shown
2. Automatically logged in
3. Redirected to dashboard
4. User appears in backend database
5. Console shows: No errors

## Fallback Mode 🔄

If backend is not running:
- Signup will still work
- Account stored locally (DEMO_USERS)
- Won't persist to database
- Good for frontend testing
- Console will show: "Using fallback mode"
