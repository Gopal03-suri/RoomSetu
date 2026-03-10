# ✅ Verify Backend Account Creation

## Problem Fixed
Frontend signup now saves accounts to the backend database instead of just storing them locally.

## How to Verify Accounts Are Created

### Method 1: Django Admin Panel
1. Start backend: `cd backend && python manage.py runserver`
2. Go to: `http://localhost:8000/admin`
3. Login with admin credentials
4. Click on "Users" to see all registered accounts

### Method 2: Django Shell
```bash
cd backend
python manage.py shell
```

Then run:
```python
from users.models import User
# See all users
User.objects.all()

# See specific user
User.objects.filter(email='newuser@example.com')

# Count users
User.objects.count()
```

### Method 3: API Endpoint
```bash
# Get all users (if you have permission)
curl http://localhost:8000/api/auth/users/
```

### Method 4: Database Direct
```bash
cd backend
python manage.py dbshell
```

Then:
```sql
SELECT * FROM users_user;
SELECT email, first_name, last_name, role, city FROM users_user;
```

## Test the Full Flow

1. **Start Backend**:
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend**:
   ```bash
   cd roomsetu
   npm run dev
   ```

3. **Create Account**:
   - Go to login page
   - Click "Don't have an account? Sign Up"
   - Fill in:
     - Name: "Test User"
     - Email: "test@example.com"
     - Password: "test123"
     - City: "Mumbai"
     - Role: "Tenant"
   - Click "Sign Up"

4. **Verify in Backend**:
   ```bash
   cd backend
   python manage.py shell
   ```
   
   ```python
   from users.models import User
   user = User.objects.get(email='test@example.com')
   print(f"Name: {user.first_name} {user.last_name}")
   print(f"Email: {user.email}")
   print(f"Role: {user.role}")
   print(f"City: {user.city}")
   ```

## What Changed

### Before ❌
- Signup only stored data in `DEMO_USERS` object (frontend memory)
- Data lost on page refresh
- Not saved to database

### After ✅
- Signup calls backend API: `POST /api/auth/signup/`
- User created in Django database
- Password securely hashed
- Data persists across sessions
- Can login from any device

## Files Modified
- `roomsetu/src/api.js` - Added `signup()` function
- `roomsetu/src/App.jsx` - Updated `handleSignup()` to use API

## Common Issues

### Issue: "CSRF token missing"
**Solution**: Make sure `credentials: 'include'` is in the fetch request

### Issue: "User already exists"
**Solution**: Email/username must be unique. Try a different email.

### Issue: "Connection refused"
**Solution**: Make sure backend is running on port 8000

### Issue: "CORS error"
**Solution**: Check `CORS_ALLOWED_ORIGINS` in `settings.py`
