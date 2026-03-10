# RoomSetu - Django Backend Integration Complete! ✅

## What Has Been Created

### Backend (Django)
✅ **Django Project Structure**
- `users` app - User authentication with role-based access (tenant, owner, agent, admin)
- `properties` app - Property listings and roommate profiles
- `chat` app - Messaging system between users

✅ **Database Models**
- User (custom user model with roles)
- Property (listings with all details)
- Roommate (profile with lifestyle preferences)
- Chat & Message (messaging system)

✅ **REST API Endpoints**
- Authentication: login, logout, current user
- Properties: CRUD operations with search/filter
- Roommates: CRUD operations
- Chat: messaging functionality

✅ **Demo Data**
- 4 demo users (tenant, owner, agent, admin)
- 3 sample properties
- 1 roommate profile
- All with password: 123456

✅ **Admin Panel**
- Full Django admin interface at http://localhost:8000/admin
- Manage users, properties, roommates, chats

### Frontend Integration
✅ **API Service Layer** (`src/api.js`)
- Centralized API calls
- Proper error handling
- Credentials management

✅ **Integration Examples** (`src/API_INTEGRATION_EXAMPLE.jsx`)
- Login with backend
- Fetch properties
- Fetch roommates
- Create property
- Logout

## Quick Start

### Option 1: Use the Batch Script (Windows)
```bash
# Double-click this file:
start_app.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd roomsetu
npm run dev
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👤 Tenant | tenant@roomsetu.com | 123456 |
| 🏠 Owner | owner@roomsetu.com | 123456 |
| 🚗 Agent | agent@roomsetu.com | 123456 |
| 🛡 Admin | admin@roomsetu.com | 123456 |

## API Endpoints Reference

### Authentication
```
POST   /api/auth/login/          - Login user
POST   /api/auth/logout/         - Logout user
GET    /api/auth/current/        - Get current user info
```

### Properties
```
GET    /api/properties/          - List all properties
POST   /api/properties/          - Create new property
GET    /api/properties/{id}/     - Get property details
PUT    /api/properties/{id}/     - Update property
DELETE /api/properties/{id}/     - Delete property
```

### Roommates
```
GET    /api/roommates/           - List all roommates
POST   /api/roommates/           - Create roommate profile
GET    /api/roommates/{id}/      - Get roommate details
PUT    /api/roommates/{id}/      - Update roommate profile
DELETE /api/roommates/{id}/      - Delete roommate profile
```

### Chat
```
GET    /api/chats/               - List user's chats
POST   /api/chats/{id}/send_message/  - Send message in chat
```

## Testing the Integration

### 1. Test Backend API (using browser or Postman)
```
http://localhost:8000/api/properties/
http://localhost:8000/api/roommates/
```

### 2. Test Login
- Open frontend
- Click "Tenant" demo button
- Should login successfully

### 3. Test Data Fetching
- Navigate to "Find Room"
- Should see properties from database
- Navigate to "Find Roommate"
- Should see roommate profiles

## Next Steps to Fully Integrate

### Step 1: Update App.jsx
Replace mock data with API calls. See `API_INTEGRATION_EXAMPLE.jsx` for examples.

### Step 2: Handle Loading States
```javascript
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  api.getProperties()
    .then(setData)
    .finally(() => setLoading(false));
}, []);
```

### Step 3: Handle Errors
```javascript
try {
  const data = await api.getProperties();
  setListings(data);
} catch (error) {
  console.error('Failed to fetch:', error);
  setError('Failed to load properties');
}
```

### Step 4: Add Create/Update Operations
```javascript
const handleCreate = async (formData) => {
  await api.createProperty(formData);
  // Refresh list
  const updated = await api.getProperties();
  setListings(updated);
};
```

## Database Management

### View Database
```bash
cd backend
python manage.py dbshell
```

### Reset Database
```bash
cd backend
del db.sqlite3
python manage.py migrate
python manage.py populate_data
```

### Add More Demo Data
Edit: `backend/users/management/commands/populate_data.py`
Then run: `python manage.py populate_data`

## Troubleshooting

### Backend won't start
- Check if port 8000 is free
- Activate virtual environment first
- Run: `pip install Django djangorestframework django-cors-headers`

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check CORS settings in `backend/roomsetu_backend/settings.py`
- Verify API_BASE_URL in `src/api.js`

### Login not working
- Check browser console for errors
- Verify credentials in database
- Check Django terminal for error logs

### CORS errors
Add your frontend URL to CORS_ALLOWED_ORIGINS in settings.py:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]
```

## File Structure

```
room rent/
├── backend/
│   ├── users/
│   │   ├── models.py          # User model
│   │   ├── views.py           # Auth views
│   │   ├── serializers.py     # User serializers
│   │   └── management/commands/populate_data.py
│   ├── properties/
│   │   ├── models.py          # Property & Roommate models
│   │   ├── views.py           # Property views
│   │   └── serializers.py     # Property serializers
│   ├── chat/
│   │   ├── models.py          # Chat & Message models
│   │   ├── views.py           # Chat views
│   │   └── serializers.py     # Chat serializers
│   ├── roomsetu_backend/
│   │   ├── settings.py        # Django settings
│   │   └── urls.py            # URL routing
│   ├── manage.py
│   └── db.sqlite3             # Database
│
├── roomsetu/
│   └── src/
│       ├── App.jsx            # Main React app
│       ├── api.js             # API service layer
│       └── API_INTEGRATION_EXAMPLE.jsx
│
├── start_app.bat              # Quick start script
├── BACKEND_SETUP.md           # Setup guide
└── README.md                  # Original readme
```

## Production Considerations

### Security
- [ ] Change SECRET_KEY in settings.py
- [ ] Set DEBUG = False
- [ ] Use environment variables for sensitive data
- [ ] Implement proper authentication (JWT tokens)
- [ ] Add rate limiting

### Database
- [ ] Switch from SQLite to PostgreSQL
- [ ] Set up database backups
- [ ] Add database indexes for performance

### Deployment
- [ ] Backend: Heroku, AWS, DigitalOcean, Railway
- [ ] Frontend: Vercel, Netlify, AWS S3
- [ ] Set up CI/CD pipeline
- [ ] Configure production CORS settings

## Support & Documentation

- Django Docs: https://docs.djangoproject.com/
- DRF Docs: https://www.django-rest-framework.org/
- React Docs: https://react.dev/

## Success! 🎉

Your RoomSetu application now has:
✅ Working Django backend with REST API
✅ Database with demo data
✅ User authentication system
✅ CRUD operations for properties and roommates
✅ Chat functionality foundation
✅ Admin panel for management
✅ API service layer for React
✅ Integration examples

**You're ready to start integrating the frontend with the backend!**
