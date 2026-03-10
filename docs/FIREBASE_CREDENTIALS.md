# 🔥 Firebase Credentials - Quick Paste Guide

## 📍 Where to Paste Your Firebase Credentials

### File Location:
```
roomsetu/src/firebaseConfig.js
```

### What to Replace:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",                    // ← Replace this
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // ← Replace this
  projectId: "YOUR_PROJECT_ID",                   // ← Replace this
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // ← Replace this
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // ← Replace this
  appId: "YOUR_APP_ID"                            // ← Replace this
};
```

## 🎯 Quick Steps:

1. **Get credentials** from Firebase Console
2. **Open** `roomsetu/src/firebaseConfig.js`
3. **Replace** all `YOUR_*` values
4. **Save** the file
5. **Run** `install_firebase.bat`
6. **Start** app with `start_app.bat`

## ✅ Example (After Pasting):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyABC123XYZ789...",
  authDomain: "roomsetu-12345.firebaseapp.com",
  projectId: "roomsetu-12345",
  storageBucket: "roomsetu-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123xyz789"
};
```

## 🔐 GitHub OAuth (Optional):

If enabling GitHub login, also update in Firebase Console:
- Client ID: (from GitHub OAuth App)
- Client Secret: (from GitHub OAuth App)

## 📚 Full Guide:
See [SOCIAL_LOGIN_SETUP.md](SOCIAL_LOGIN_SETUP.md) for complete instructions.
