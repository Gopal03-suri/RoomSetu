# ✅ Firebase Setup - Next Steps

Your Firebase credentials are configured! Now enable authentication providers.

## 🔥 Firebase Console Setup

### 1. Enable Google Sign-In (2 minutes)

1. Go to: https://console.firebase.google.com/project/roomsetu-c5136/authentication/providers
2. Click **"Get started"** (if first time)
3. Click **"Google"** in the providers list
4. Toggle **"Enable"**
5. Select your support email
6. Click **"Save"**

✅ **Done! Google login will work immediately**

### 2. Enable GitHub Sign-In (5 minutes)

#### Step A: Create GitHub OAuth App

1. Go to: https://github.com/settings/developers
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:
   ```
   Application name: RoomSetu
   Homepage URL: http://localhost:5173
   Authorization callback URL: https://roomsetu-c5136.firebaseapp.com/__/auth/handler
   ```
4. Click **"Register application"**
5. **Copy the Client ID**
6. Click **"Generate a new client secret"**
7. **Copy the Client Secret** (save it!)

#### Step B: Configure Firebase

1. Go back to Firebase Console
2. Click **"GitHub"** in providers list
3. Toggle **"Enable"**
4. Paste:
   - **Client ID** (from GitHub)
   - **Client Secret** (from GitHub)
5. Click **"Save"**

✅ **Done! GitHub login will work**

### 3. Enable Phone Sign-In (Optional)

1. In Firebase Console, click **"Phone"**
2. Toggle **"Enable"**
3. Click **"Save"**

For testing, add test numbers:
- Phone: `+911234567890`
- Code: `123456`

## 🚀 Test Your Setup

1. **Start the app**:
   ```bash
   start_app.bat
   ```

2. **Go to login page**: http://localhost:5173/login

3. **Try the buttons**:
   - Click **Google** → Should open Google account picker
   - Click **GitHub** → Should redirect to GitHub authorization
   - Click **Phone** → Coming soon message

## 🎯 Current Status

- ✅ Firebase installed
- ✅ Credentials configured
- ⏳ Need to enable providers in Firebase Console
- ⏳ Need to test social login

## 📱 What Each Button Does

| Button | Status | Action |
|--------|--------|--------|
| 🔵 Google | Ready after enabling | Opens Google login popup |
| ⚫ GitHub | Ready after OAuth setup | Redirects to GitHub |
| 🟢 Phone | Coming soon | Will open phone input |

## 🔍 Troubleshooting

### "Firebase: Error (auth/operation-not-allowed)"
**Solution**: Enable the provider in Firebase Console

### "Popup blocked"
**Solution**: Allow popups for localhost in browser

### GitHub: "redirect_uri_mismatch"
**Solution**: Use exact callback URL from Firebase:
```
https://roomsetu-c5136.firebaseapp.com/__/auth/handler
```

## 📚 Resources

- **Firebase Console**: https://console.firebase.google.com/project/roomsetu-c5136
- **GitHub OAuth Apps**: https://github.com/settings/developers
- **Full Guide**: See `docs/SOCIAL_LOGIN_SETUP.md`

## ✨ Quick Links

- **Enable Google**: https://console.firebase.google.com/project/roomsetu-c5136/authentication/providers
- **Enable GitHub**: Same link, click GitHub
- **GitHub OAuth**: https://github.com/settings/developers

---

**Next**: Enable Google and GitHub in Firebase Console, then test! 🚀
