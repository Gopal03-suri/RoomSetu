# 🎯 START HERE - RoomSetu Full Stack Application

## 👋 Welcome!

You have a **fully integrated Django + React application** ready to run!

---

## ⚡ Quick Start (2 Minutes)

### Windows Users:
1. **Double-click** `start_app.bat`
2. **Wait** for both servers to start (2 windows will open)
3. **Open browser** to http://localhost:5173
4. **Click "Tenant"** button to login
5. **Explore!** 🎉

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

Then open http://localhost:5173 and click "Tenant" to login.

---

## 🔑 Demo Accounts

| Click This | Email | Password |
|------------|-------|----------|
| **Tenant** | tenant@roomsetu.com | 123456 |
| **Owner** | owner@roomsetu.com | 123456 |
| **Agent** | agent@roomsetu.com | 123456 |
| **Admin** | admin@roomsetu.com | 123456 |

---

## 🌐 Important URLs

| What | URL |
|------|-----|
| **Your App** | http://localhost:5173 |
| **API** | http://localhost:8000/api |
| **Admin Panel** | http://localhost:8000/admin |

---

## 📚 What to Read Next

### If you're new:
1. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ← Read this first! (5 min)
2. **[COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md)** ← What's been built (10 min)
3. **[README_FULLSTACK.md](README_FULLSTACK.md)** ← Complete guide (20 min)

### If you want to code:
1. **[API_INTEGRATION_EXAMPLE.jsx](roomsetu/src/API_INTEGRATION_EXAMPLE.jsx)** ← Code examples
2. **[api.js](roomsetu/src/api.js)** ← API service layer
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** ← System design

### If you want to deploy:
1. **[CHECKLIST.md](CHECKLIST.md)** ← Deployment checklist
2. **[BACKEND_SETUP.md](BACKEND_SETUP.md)** ← Production setup

### Need help?
1. **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** ← Find any doc
2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** ← Troubleshooting

---

## ✅ Verify Everything Works

### Test 1: Backend API
Open in browser: http://localhost:8000/api/properties/

**Expected:** JSON data with 3 properties

### Test 2: Frontend
Open in browser: http://localhost:5173

**Expected:** Splash screen, then login page

### Test 3: Login
Click "Tenant" button

**Expected:** Dashboard with property listings

### Test 4: Admin Panel
Go to: http://localhost:8000/admin
Login: admin@roomsetu.com / 123456

**Expected:** Django admin interface

---

## 🎯 What You Have

✅ **Backend:** Django REST API with 12 endpoints
✅ **Frontend:** React app with Tailwind CSS
✅ **Database:** SQLite with demo data (4 users, 3 properties)
✅ **Authentication:** Session-based login/logout
✅ **Admin Panel:** Full Django admin interface
✅ **Documentation:** 11 comprehensive guides
✅ **Tools:** API tests, Postman collection, quick start script

---

## 🚀 Next Steps

### Option 1: Explore the App
- Login with different roles
- Browse properties
- Check roommate profiles
- Try the cost calculator
- Explore admin panel

### Option 2: Start Coding
- Open `roomsetu/src/App.jsx`
- Review `roomsetu/src/api.js`
- Read `API_INTEGRATION_EXAMPLE.jsx`
- Start integrating API calls

### Option 3: Learn the System
- Read `ARCHITECTURE.md`
- Study the database models
- Understand the API endpoints
- Review the documentation

---

## 🐛 Something Not Working?

### Backend won't start?
```bash
cd backend
venv\Scripts\activate
pip install Django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

### Frontend won't start?
```bash
cd roomsetu
npm install
npm run dev
```

### Can't login?
- Make sure backend is running on port 8000
- Check browser console (F12) for errors
- Verify demo data: `python manage.py populate_data`

### Still stuck?
Read **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** → Troubleshooting section

---

## 💡 Pro Tips

1. **Keep both servers running** while developing
2. **Check terminal output** for errors
3. **Use browser DevTools** (F12) for debugging
4. **Test API first** before integrating in React
5. **Use admin panel** to view/edit data
6. **Read documentation** when stuck

---

## 📞 Quick Help

| Problem | Solution |
|---------|----------|
| Port 8000 in use | `python manage.py runserver 8001` |
| Port 5173 in use | `npm run dev -- --port 3001` |
| CORS errors | Check backend is running on 8000 |
| Login fails | Verify credentials, check console |
| No data showing | Run `python manage.py populate_data` |
| Database errors | Delete db.sqlite3, run migrations |

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just run `start_app.bat` and start exploring!

**Need more info?** Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for all guides.

---

## 📋 Quick Command Reference

```bash
# Start backend
cd backend && venv\Scripts\activate && python manage.py runserver

# Start frontend
cd roomsetu && npm run dev

# Reset database
cd backend && del db.sqlite3 && python manage.py migrate && python manage.py populate_data

# Test API
cd backend && python test_api.py

# Create admin user
cd backend && python manage.py createsuperuser
```

---

## 🏆 Success Checklist

- [ ] Both servers started successfully
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:8000/api/properties/
- [ ] Can login with demo account
- [ ] Properties load in frontend
- [ ] Admin panel accessible
- [ ] No errors in console

**All checked?** You're good to go! 🚀

---

## 🎯 Your Mission

**Build amazing features for RoomSetu!**

The foundation is ready. Now it's time to:
- Integrate API calls in React
- Add new features
- Improve the UI
- Deploy to production

**You got this!** 💪

---

**Questions?** → Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
**Want to code?** → See [API_INTEGRATION_EXAMPLE.jsx](roomsetu/src/API_INTEGRATION_EXAMPLE.jsx)
**Need overview?** → Read [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md)

---

**🎊 Happy Coding! 🎊**

*Everything you need is documented and ready to use.*
