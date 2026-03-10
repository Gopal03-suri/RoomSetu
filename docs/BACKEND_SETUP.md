# RoomSetu Backend Setup Guide

## Prerequisites
- Python 3.8+ installed
- Node.js 14+ installed
- Git (optional)

## Backend Setup (Django)

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Activate virtual environment
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 3. Install dependencies (if not already installed)
```bash
pip install Django djangorestframework django-cors-headers
```

### 4. Run migrations (already done, but if needed)
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Populate demo data (already done, but if needed)
```bash
python manage.py populate_data
```

### 6. Create superuser for admin panel (OPTIONAL)
```bash
python manage.py createsuperuser
```

### 7. Start Django development server
```bash
python manage.py runserver
```

Backend will run on: **http://localhost:8000**

Admin panel: **http://localhost:8000/admin**

## Frontend Setup (React)

### 1. Navigate to frontend directory
```bash
cd roomsetu
```

### 2. Install dependencies (if not already installed)
```bash
npm install
```

### 3. Start React development server
```bash
npm run dev
```

Frontend will run on: **http://localhost:5173** (Vite) or **http://localhost:3000** (Create React App)

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Tenant | tenant@roomsetu.com | 123456 |
| Owner | owner@roomsetu.com | 123456 |
| Agent | agent@roomsetu.com | 123456 |
| Admin | admin@roomsetu.com | 123456 |

## API Endpoints

### Authentication
- POST `/api/auth/login/` - Login
- POST `/api/auth/logout/` - Logout
- GET `/api/auth/current/` - Get current user

### Properties
- GET `/api/properties/` - List all properties
- POST `/api/properties/` - Create property
- GET `/api/properties/{id}/` - Get property details
- PUT `/api/properties/{id}/` - Update property
- DELETE `/api/properties/{id}/` - Delete property

### Roommates
- GET `/api/roommates/` - List all roommates
- POST `/api/roommates/` - Create roommate profile
- GET `/api/roommates/{id}/` - Get roommate details

### Chat
- GET `/api/chats/` - List user's chats
- POST `/api/chats/{id}/send_message/` - Send message

## Testing the Integration

1. Start backend server: `python manage.py runserver`
2. Start frontend server: `npm run dev`
3. Open browser to frontend URL
4. Login with demo account
5. Browse properties, roommates, and chat

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure:
- Django backend is running on port 8000
- Frontend is running on port 3000 or 5173
- CORS settings in `settings.py` include your frontend URL

### Database Issues
Reset database:
```bash
cd backend
del db.sqlite3
python manage.py migrate
python manage.py populate_data
```

### Port Already in Use
**Backend:**
```bash
python manage.py runserver 8001
```
Update API_BASE_URL in `src/api.js`

**Frontend:**
```bash
npm run dev -- --port 3001
```

## Project Structure

```
room rent/
├── backend/                 # Django backend
│   ├── users/              # User authentication app
│   ├── properties/         # Properties & roommates app
│   ├── chat/               # Chat functionality app
│   ├── roomsetu_backend/   # Main Django project
│   ├── manage.py
│   └── db.sqlite3          # SQLite database
│
└── roomsetu/               # React frontend
    ├── src/
    │   ├── App.jsx         # Main React component
    │   ├── api.js          # API service layer
    │   └── main.jsx
    └── package.json
```

## Next Steps

### To integrate API calls in React:

1. Import API service in App.jsx:
```javascript
import { api } from './api';
```

2. Replace mock data with API calls:
```javascript
// Instead of MOCK_LISTINGS
const [listings, setListings] = useState([]);

useEffect(() => {
  api.getProperties().then(data => setListings(data));
}, []);
```

3. Update login function:
```javascript
const handleLogin = async (email, password) => {
  const response = await api.login(email, password);
  if (response.user) {
    setUser(response.user);
  }
};
```

## Production Deployment

### Backend (Django)
1. Set `DEBUG = False` in settings.py
2. Configure proper SECRET_KEY
3. Set ALLOWED_HOSTS
4. Use PostgreSQL instead of SQLite
5. Deploy to: Heroku, AWS, DigitalOcean, Railway

### Frontend (React)
1. Build production bundle: `npm run build`
2. Deploy to: Vercel, Netlify, AWS S3, GitHub Pages

## Support

For issues or questions:
- Check Django logs in terminal
- Check browser console for frontend errors
- Verify API endpoints with tools like Postman
- Ensure both servers are running simultaneously
