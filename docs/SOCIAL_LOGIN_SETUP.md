# 🔐 Social Login Setup Guide

Complete guide to set up Google, GitHub, and Phone authentication.

## 📋 Prerequisites

- Firebase account (free)
- GitHub account (for GitHub login)
- Google account (for Google login)

## 🚀 Step 1: Install Firebase

```bash
# Run this command
install_firebase.bat
```

Or manually:
```bash
cd roomsetu
npm install firebase
```

## 🔥 Step 2: Create Firebase Project

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Add project"** or select existing project
3. Enter project name: `RoomSetu`
4. Click **Continue** → **Continue** → **Create project**

## 🔑 Step 3: Get Firebase Credentials

1. In Firebase Console, click **⚙️ (Settings)** → **Project settings**
2. Scroll to **"Your apps"** section
3. Click **Web icon** `</>`
4. Register app:
   - App nickname: `RoomSetu Web`
   - Click **Register app**
5. **Copy the firebaseConfig object**

Example:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "roomsetu-xxxxx.firebaseapp.com",
  projectId: "roomsetu-xxxxx",
  storageBucket: "roomsetu-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

## 📝 Step 4: Update Configuration

1. Open `roomsetu/src/firebaseConfig.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",           // ← Paste your apiKey
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // ← Paste your authDomain
  projectId: "YOUR_PROJECT_ID",          // ← Paste your projectId
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // ← Paste your storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // ← Paste your messagingSenderId
  appId: "YOUR_APP_ID"                   // ← Paste your appId
};
```

3. Save the file

## 🔐 Step 5: Enable Authentication Providers

### A. Enable Google Sign-In

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"** (if first time)
3. Click **"Sign-in method"** tab
4. Find **Google** in the list
5. Click **Google** → Toggle **Enable**
6. Select support email
7. Click **Save**

✅ **Google login is now ready!**

### B. Enable GitHub Sign-In

#### Part 1: Create GitHub OAuth App

1. Go to **[GitHub Settings](https://github.com/settings/developers)**
2. Click **"Developer settings"** (left sidebar)
3. Click **"OAuth Apps"** → **"New OAuth App"**
4. Fill in:
   - **Application name**: `RoomSetu`
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: (Get from Firebase - see below)
5. Click **"Register application"**
6. **Copy** the **Client ID**
7. Click **"Generate a new client secret"**
8. **Copy** the **Client Secret** (save it securely!)

#### Part 2: Configure Firebase

1. Back in Firebase Console → **Authentication** → **Sign-in method**
2. Find **GitHub** in the list
3. Click **GitHub** → Toggle **Enable**
4. **Copy the callback URL** shown (looks like: `https://roomsetu-xxxxx.firebaseapp.com/__/auth/handler`)
5. Go back to GitHub OAuth App settings
6. Paste the callback URL in **"Authorization callback URL"**
7. Click **"Update application"**
8. Back in Firebase, paste:
   - **Client ID** (from GitHub)
   - **Client Secret** (from GitHub)
9. Click **Save**

✅ **GitHub login is now ready!**

### C. Enable Phone Sign-In (Optional)

1. In Firebase Console → **Authentication** → **Sign-in method**
2. Find **Phone** in the list
3. Click **Phone** → Toggle **Enable**
4. Add test phone numbers (for development):
   - Click **"Add test phone number"**
   - Phone: `+911234567890`
   - Code: `123456`
5. Click **Save**

✅ **Phone login is now ready!**

## 🌐 Step 6: Add Authorized Domains

1. In Firebase Console → **Authentication** → **Settings** tab
2. Scroll to **"Authorized domains"**
3. Add:
   - `localhost` (should already be there)
   - Your production domain (when deploying)

## ✅ Step 7: Test Social Login

1. **Start your app**:
   ```bash
   start_app.bat
   ```

2. **Open**: http://localhost:5173

3. **Click on login page**:
   - Try **Google** button → Should open Google login popup
   - Try **GitHub** button → Should open GitHub authorization
   - Try **Phone** button → Coming soon message

## 🎯 What Each Button Does

| Button | Icon | Action |
|--------|------|--------|
| **Google** | Google logo | Opens Google account picker |
| **GitHub** | GitHub logo | Redirects to GitHub authorization |
| **Phone** | Phone icon | Opens phone number input (coming soon) |

## 🔍 Troubleshooting

### Error: "Firebase not initialized"
**Solution**: Make sure you updated `firebaseConfig.js` with your credentials

### Error: "auth/unauthorized-domain"
**Solution**: Add your domain to Authorized domains in Firebase Console

### Error: "GitHub OAuth: redirect_uri_mismatch"
**Solution**: 
1. Copy callback URL from Firebase
2. Update it in GitHub OAuth App settings

### Google login popup blocked
**Solution**: Allow popups for localhost in browser settings

### GitHub login not working
**Solution**: 
1. Check Client ID and Secret are correct
2. Verify callback URL matches exactly
3. Make sure GitHub OAuth app is not suspended

## 📱 Phone Authentication (Advanced)

To fully implement phone auth:

1. **Update `App.jsx`** to add phone input modal
2. **Add reCAPTCHA** container
3. **Implement OTP verification**

Example code in `firebaseAuth.js` is ready to use!

## 🚀 Production Deployment

Before deploying:

1. **Add production domain** to Firebase Authorized domains
2. **Update OAuth callback URLs** in GitHub
3. **Enable billing** in Firebase (for phone auth)
4. **Set up environment variables** for sensitive data

## 📚 Resources

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Firebase Phone Auth](https://firebase.google.com/docs/auth/web/phone-auth)

## 🆘 Need Help?

Check the browser console for detailed error messages!
