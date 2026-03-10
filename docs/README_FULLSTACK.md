# 🏠 RoomSetu - Full Stack Application

Smart Roommate Matching Platform with Django Backend & React Frontend

## 🚀 Quick Start (Easiest Way)

### Windows Users:
1. Double-click `start_app.bat`
2. Wait for both servers to start
3. Open browser to http://localhost:5173
4. Login with demo account (see below)

### Mac/Linux Users:
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend
cd roomsetu
npm run dev
```

## 📋 Demo Accounts

| Role | Email | Password | Features |
|------|-------|----------|----------|
| 👤 Tenant | tenant@roomsetu.com | 123456 | Find rooms, roommates, chat |
| 🏠 Owner | owner@roomsetu.com | 123456 | Add properties, manage tenants |
| 🚗 Agent | agent@roomsetu.com | 123456 | Add rural listings, visit logs |
| 🛡 Admin | admin@roomsetu.com | 123456 | User management, analytics |

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│  React Frontend │ ◄─────► │ Django Backend  │
│  (Port 5173)    │  REST   │  (Port 8000)    │
│                 │   API   │                 │
└─────────────────┘         └─────────────────┘
                                    │
                                    ▼
                            ┌─────────────────┐
                            │  SQLite DB      │
                            │  (db.sqlite3)   │
                            └─────────────────┘
```

## 📁 Project Structure

```
room rent/
│
├── backend/                      # Django Backend
│   ├── users/                    # User authentication app
│   │   ├── models.py            # User model with roles
│   │   ├── views.py             # Auth API views
│   │   ├── serializers.py       # User serializers
│   │   └── management/commands/
│   │       └── populate_data.py # Demo data script
│   │
│   ├── properties/               # Properties & Roommates app
│   │   ├── models.py            # Property & Roommate models
│   │   ├── views.py             # Property API views
│   │   └── serializers.py       # Property serializers
│   │
│   ├── chat/                     # Chat functionality app
│   │   ├── models.py            # Chat & Message models
│   │   ├── views.py             # Chat API views
│   │   └── serializers.py       # Chat serializers
│   │
│   ├── roomsetu_backend/         # Main Django project
│   │   ├── settings.py          # Django configuration
│   │   └── urls.py              # URL routing
│   │
│   ├── venv/                     # Python virtual environment
│   ├── manage.py                 # Django management script
│   ├── db.sqlite3               # SQLite database
│   └── requirements.txt          # Python dependencies
│
├── roomsetu/                     # React Frontend
│   ├── src/
│   │   ├── App.jsx              # Main React component
│   │   ├── SplashScreen.jsx     # Splash screen
│   │   ├── api.js               # API service layer
│   │   └── API_INTEGRATION_EXAMPLE.jsx  # Integration guide
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── start_app.bat                 # Quick start script (Windows)
├── BACKEND_SETUP.md             # Backend setup guide
├── INTEGRATION_COMPLETE.md      # Integration summary
└── README.md                    # This file
```

## 🔧 Manual Setup (First Time)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install Django djangorestframework django-cors-headers
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Populate demo data:**
   ```bash
   python manage.py populate_data
   ```

6. **Start server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd roomsetu
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

### Base URL: `http://localhost:8000/api`

### Authentication
```
POST   /auth/login/              Login user
POST   /auth/logout/             Logout user
GET    /auth/current/            Get current user
```

### Properties
```
GET    /properties/              List all properties
POST   /properties/              Create property
GET    /properties/{id}/         Get property details
PUT    /properties/{id}/         Update property
DELETE /properties/{id}/         Delete property
```

### Roommates
```
GET    /roommates/               List all roommates
POST   /roommates/               Create roommate profile
GET    /roommates/{id}/          Get roommate details
PUT    /roommates/{id}/          Update profile
DELETE /roommates/{id}/          Delete profile
```

### Chat
```
GET    /chats/                   List user's chats
POST   /chats/{id}/send_message/ Send message
```

## 🔌 Frontend API Integration

### 1. Import API service
```javascript
import { api } from './api';
```

### 2. Login Example
```javascript
const handleLogin = async (email, password) => {
  try {
    const response = await api.login(email, password);
    if (response.user) {
      setUser(response.user);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 3. Fetch Properties Example
```javascript
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const data = await api.getProperties();
      setListings(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };
  fetchProperties();
}, []);
```

### 4. Create Property Example
```javascript
const handleSubmit = async (formData) => {
  try {
    await api.createProperty(formData);
    alert('Property created!');
  } catch (error) {
    alert('Failed to create property');
  }
};
```

## 🎯 Features

### For Tenants
- 🔍 Find rooms with advanced filters
- 👥 Match with compatible roommates
- 💰 Calculate cost splits
- 💬 Chat with owners and roommates
- ✅ Move-in checklist tracker

### For Property Owners
- ➕ Add property listings
- 👥 Manage tenants
- 💵 Track earnings
- 📊 View analytics

### For Field Agents
- 🗺 Log rural property visits
- 📷 Add digitally assisted listings
- ✅ Verify properties on-site

### For Admins
- 📊 Analytics dashboard
- 👥 User management
- 🏘 Listings moderation
- 🚨 Handle reports

## 🛠️ Tech Stack

### Backend
- **Framework:** Django 6.0
- **API:** Django REST Framework
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **CORS:** django-cors-headers

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router

## 🧪 Testing

### Test Backend API
```bash
# Using curl
curl http://localhost:8000/api/properties/

# Using browser
http://localhost:8000/api/properties/
```

### Test Admin Panel
1. Go to http://localhost:8000/admin
2. Login with admin@roomsetu.com / 123456
3. Manage users, properties, chats

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
python manage.py runserver 8001
# Update API_BASE_URL in src/api.js
```

**Database errors:**
```bash
cd backend
del db.sqlite3  # Windows
rm db.sqlite3   # Mac/Linux
python manage.py migrate
python manage.py populate_data
```

**Module not found:**
```bash
pip install Django djangorestframework django-cors-headers
```

### Frontend Issues

**Port 5173 already in use:**
```bash
npm run dev -- --port 3001
```

**Dependencies missing:**
```bash
npm install
```

**CORS errors:**
- Ensure backend is running
- Check CORS_ALLOWED_ORIGINS in settings.py
- Verify API_BASE_URL in api.js

### Common Issues

**Login not working:**
- Check browser console for errors
- Verify backend is running on port 8000
- Check Django terminal for API errors

**Data not loading:**
- Ensure demo data is populated: `python manage.py populate_data`
- Check network tab in browser DevTools
- Verify API endpoints are accessible

## 📦 Database Management

### View all users:
```bash
cd backend
python manage.py shell
>>> from users.models import User
>>> User.objects.all()
```

### View all properties:
```bash
>>> from properties.models import Property
>>> Property.objects.all()
```

### Reset everything:
```bash
del db.sqlite3
python manage.py migrate
python manage.py populate_data
```

## 🚀 Deployment

### Backend (Django)
**Recommended platforms:**
- Railway (easiest)
- Heroku
- DigitalOcean
- AWS Elastic Beanstalk

**Pre-deployment checklist:**
- [ ] Set DEBUG = False
- [ ] Configure SECRET_KEY from environment
- [ ] Set ALLOWED_HOSTS
- [ ] Use PostgreSQL
- [ ] Configure static files
- [ ] Set up HTTPS

### Frontend (React)
**Recommended platforms:**
- Vercel (easiest)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

**Build command:**
```bash
npm run build
```

## 📚 Documentation

- **Backend Setup:** See `BACKEND_SETUP.md`
- **Integration Guide:** See `INTEGRATION_COMPLETE.md`
- **API Examples:** See `src/API_INTEGRATION_EXAMPLE.jsx`

## 🔐 Security Notes

⚠️ **Current setup is for DEVELOPMENT only**

For production:
1. Change SECRET_KEY in settings.py
2. Use environment variables for sensitive data
3. Implement JWT authentication
4. Add rate limiting
5. Enable HTTPS
6. Use PostgreSQL instead of SQLite
7. Add input validation and sanitization

## 📞 Support

### Check logs:
- **Backend:** Django terminal output
- **Frontend:** Browser console (F12)

### Test API manually:
- Use Postman or Insomnia
- Or browser: http://localhost:8000/api/properties/

### Database issues:
```bash
python manage.py dbshell
```

## ✅ Verification Checklist

- [ ] Backend server starts on port 8000
- [ ] Frontend server starts on port 5173
- [ ] Can access http://localhost:8000/api/properties/
- [ ] Can login with demo account
- [ ] Properties load in frontend
- [ ] Admin panel accessible at /admin

## 🎉 Success!

Your RoomSetu application is now fully integrated with:
- ✅ Django REST API backend
- ✅ React frontend
- ✅ User authentication
- ✅ Property management
- ✅ Roommate matching
- ✅ Chat functionality
- ✅ Admin panel
- ✅ Demo data

**Start building amazing features!** 🚀

---

© 2024 RoomSetu - Smart Roommate Matching Platform
