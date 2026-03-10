# 🎴 RoomSetu - Quick Reference Card

## 🚀 START THE APPLICATION

### Windows (Easiest):
```
Double-click: start_app.bat
```

### Manual Start:
```bash
# Terminal 1 - Backend
cd backend
venv\Scripts\activate          # Windows
source venv/bin/activate       # Mac/Linux
python manage.py runserver

# Terminal 2 - Frontend
cd roomsetu
npm run dev
```

## 🌐 ACCESS URLS

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:8000/api |
| **Admin Panel** | http://localhost:8000/admin |
| **API Docs** | http://localhost:8000/api/ |

## 🔑 DEMO CREDENTIALS

| Role | Email | Password | ID |
|------|-------|----------|-----|
| 👤 **Tenant** | tenant@roomsetu.com | 123456 | 1 |
| 🏠 **Owner** | owner@roomsetu.com | 123456 | 2 |
| 🚗 **Agent** | agent@roomsetu.com | 123456 | 3 |
| 🛡 **Admin** | admin@roomsetu.com | 123456 | 4 |

## 📡 API ENDPOINTS

### Authentication
```
POST   /api/auth/login/          # Login
POST   /api/auth/logout/         # Logout
GET    /api/auth/current/        # Current user
```

### Properties
```
GET    /api/properties/          # List all
POST   /api/properties/          # Create
GET    /api/properties/{id}/     # Get one
PUT    /api/properties/{id}/     # Update
DELETE /api/properties/{id}/     # Delete
```

### Roommates
```
GET    /api/roommates/           # List all
POST   /api/roommates/           # Create
GET    /api/roommates/{id}/      # Get one
PUT    /api/roommates/{id}/      # Update
DELETE /api/roommates/{id}/      # Delete
```

### Chat
```
GET    /api/chats/               # List chats
POST   /api/chats/{id}/send_message/  # Send message
```

## 🧪 QUICK API TESTS

### Test with curl:
```bash
# Get all properties
curl http://localhost:8000/api/properties/

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"tenant@roomsetu.com","password":"123456"}'

# Get roommates
curl http://localhost:8000/api/roommates/
```

### Test with browser:
```
http://localhost:8000/api/properties/
http://localhost:8000/api/roommates/
```

## 📦 DATABASE INFO

- **Type:** SQLite (development)
- **Location:** `backend/db.sqlite3`
- **Users:** 4 demo users
- **Properties:** 3 sample listings
- **Roommates:** 1 profile

### Reset Database:
```bash
cd backend
del db.sqlite3                    # Windows
rm db.sqlite3                     # Mac/Linux
python manage.py migrate
python manage.py populate_data
```

## 🛠️ COMMON COMMANDS

### Backend Commands:
```bash
python manage.py runserver        # Start server
python manage.py migrate          # Run migrations
python manage.py makemigrations   # Create migrations
python manage.py populate_data    # Add demo data
python manage.py createsuperuser  # Create admin
python manage.py shell            # Django shell
python manage.py test             # Run tests
```

### Frontend Commands:
```bash
npm run dev                       # Start dev server
npm run build                     # Build for production
npm run preview                   # Preview build
npm install                       # Install dependencies
```

## 🐛 TROUBLESHOOTING

### Backend won't start:
```bash
cd backend
venv\Scripts\activate
pip install Django djangorestframework django-cors-headers
python manage.py migrate
```

### Frontend won't start:
```bash
cd roomsetu
npm install
npm run dev
```

### CORS errors:
- Ensure backend is running on port 8000
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Verify `API_BASE_URL` in src/api.js

### Login not working:
- Check browser console (F12)
- Verify backend is running
- Check Django terminal for errors
- Ensure demo data is populated

### Port already in use:
```bash
# Backend - use different port
python manage.py runserver 8001

# Frontend - use different port
npm run dev -- --port 3001
```

## 📁 KEY FILES

### Backend:
```
backend/
├── roomsetu_backend/settings.py  # Django config
├── users/models.py                # User model
├── properties/models.py           # Property models
├── manage.py                      # Django CLI
└── db.sqlite3                     # Database
```

### Frontend:
```
roomsetu/
├── src/
│   ├── App.jsx                    # Main component
│   ├── api.js                     # API service
│   └── main.jsx                   # Entry point
└── package.json                   # Dependencies
```

## 🔧 CONFIGURATION

### Backend Config (settings.py):
```python
DEBUG = True
ALLOWED_HOSTS = ['*']
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
]
```

### Frontend Config (api.js):
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## 📚 DOCUMENTATION FILES

| File | Description |
|------|-------------|
| `README_FULLSTACK.md` | Complete project guide |
| `BACKEND_SETUP.md` | Backend setup instructions |
| `INTEGRATION_COMPLETE.md` | Integration summary |
| `CHECKLIST.md` | Testing & deployment checklist |
| `API_INTEGRATION_EXAMPLE.jsx` | Code examples |
| `RoomSetu_API.postman_collection.json` | Postman tests |

## 🎯 NEXT STEPS

1. **Start both servers** (use start_app.bat)
2. **Test login** with demo accounts
3. **Verify API** endpoints work
4. **Integrate API** in React components
5. **Add features** as needed
6. **Deploy** to production

## 💡 TIPS

- Always start backend before frontend
- Check both terminal windows for errors
- Use browser DevTools (F12) for debugging
- Test API with Postman before integrating
- Keep both servers running during development
- Use admin panel to view/edit data directly

## 🆘 NEED HELP?

1. Check terminal output for errors
2. Check browser console (F12)
3. Verify both servers are running
4. Test API endpoints directly
5. Check documentation files
6. Reset database if needed

## ✅ VERIFICATION

Your setup is working if:
- ✅ Backend starts on port 8000
- ✅ Frontend starts on port 5173
- ✅ Can access http://localhost:8000/api/properties/
- ✅ Can login with demo account
- ✅ Properties load in frontend
- ✅ No errors in console

## 📞 SUPPORT RESOURCES

- **Django Docs:** https://docs.djangoproject.com/
- **DRF Docs:** https://www.django-rest-framework.org/
- **React Docs:** https://react.dev/
- **Vite Docs:** https://vitejs.dev/

---

## 🎉 YOU'RE ALL SET!

**Backend:** ✅ Django REST API with demo data
**Frontend:** ✅ React app with Tailwind CSS
**Integration:** ✅ API service layer ready
**Documentation:** ✅ Complete guides available

**Start building amazing features!** 🚀

---

**Quick Start:** `start_app.bat` → Login → Explore!
