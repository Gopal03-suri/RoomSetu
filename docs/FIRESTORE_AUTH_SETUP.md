# 🔥 Firebase + Firestore Authentication Setup

Complete guide for Google Authentication with Firestore user management.

## 📋 What Was Implemented

### ✅ Authentication Flow:

1. **User clicks "Continue with Google"**
   - Firebase popup opens
   - User selects Google account
   
2. **After Google login**:
   - Check Firestore `users` collection for user's UID
   
3. **If user EXISTS in Firestore**:
   - ✅ Login directly
   - ✅ Redirect to role-based dashboard
   
4. **If user DOES NOT exist**:
   - ❌ Do NOT auto-create account
   - ➡️ Redirect to `/complete-profile`
   
5. **Complete Profile Page**:
   - Shows email (readonly)
   - User selects role (Tenant/Owner/Agent)
   - User enters name and phone
   - On submit → Create Firestore document
   - Then redirect to dashboard

## 🚀 Setup Steps

### Step 1: Enable Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/project/roomsetu-c5136)
2. Click **"Firestore Database"** in left sidebar
3. Click **"Create database"**
4. Select **"Start in test mode"** (for development)
5. Choose location: `asia-south1` (Mumbai)
6. Click **"Enable"**

### Step 2: Set Firestore Rules (Important!)

1. In Firestore, click **"Rules"** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Anyone can read user profiles
      allow read: if true;
      
      // Only authenticated users can create their own profile
      allow create: if request.auth != null 
                    && request.auth.uid == userId;
      
      // Users can only update their own profile
      allow update: if request.auth != null 
                    && request.auth.uid == userId;
      
      // No one can delete
      allow delete: if false;
    }
  }
}
```

3. Click **"Publish"**

### Step 3: Test the Flow

1. **Start app**:
   ```bash
   start_app.bat
   ```

2. **Go to login page**: http://localhost:5173/login

3. **Click "Google" button**

4. **First time user**:
   - Google popup → Select account
   - Redirected to `/complete-profile`
   - Fill in name, phone, select role
   - Click "Complete Profile"
   - Redirected to dashboard

5. **Returning user**:
   - Google popup → Select account
   - Directly logged in to dashboard

## 📁 Files Created

### 1. `authService.js` - Authentication Logic
```javascript
- signInWithGoogle()      // Google login
- checkUserExists(uid)    // Check Firestore
- createUserProfile()     // Create user doc
- signOut()               // Logout
```

### 2. `CompleteProfile.jsx` - Profile Completion Page
- Email (readonly)
- Name input
- Phone input
- Role selection (Tenant/Owner/Agent)
- Submit button

### 3. `ProtectedRoute.jsx` - Route Protection
- Checks if user is logged in
- Checks if user has role
- Redirects accordingly

### 4. Updated `firebaseConfig.js`
- Added Firestore initialization
- Exports `db` for database access

## 🔍 How It Works

### Flow Diagram:

```
User clicks Google
       ↓
Firebase Auth (Google)
       ↓
Get: uid, email, name
       ↓
Check Firestore: users/{uid}
       ↓
   ┌───┴───┐
   ↓       ↓
EXISTS   DOESN'T EXIST
   ↓       ↓
Login   Complete Profile
   ↓       ↓
Dashboard  → Fill form
           → Create doc
           → Dashboard
```

### Firestore Structure:

```
users (collection)
  └── {uid} (document)
      ├── uid: "abc123..."
      ├── email: "user@gmail.com"
      ├── name: "John Doe"
      ├── phone: "+91 98765 43210"
      ├── role: "tenant"
      └── createdAt: Timestamp
```

## 🎯 Key Features

### ✅ No Auto-Creation
- User document is NOT created during Google login
- Only created after role selection

### ✅ Role-Based Access
- Dashboard access requires role
- Protected routes check for role

### ✅ Data Validation
- All fields required in profile completion
- Email is readonly (from Google)

### ✅ Secure
- Firestore rules prevent unauthorized access
- Users can only create/update their own profile

## 🧪 Testing Checklist

- [ ] Enable Firestore in Firebase Console
- [ ] Set Firestore security rules
- [ ] Test first-time Google login
- [ ] Verify redirect to complete-profile
- [ ] Fill profile form and submit
- [ ] Check Firestore for created document
- [ ] Logout and login again
- [ ] Verify direct login (no profile page)
- [ ] Test protected route access

## 📊 Firestore Console

View your users:
1. Go to [Firestore Console](https://console.firebase.google.com/project/roomsetu-c5136/firestore)
2. Click `users` collection
3. See all registered users with their roles

## 🔧 Troubleshooting

### Error: "Missing or insufficient permissions"
**Solution**: Update Firestore rules (see Step 2)

### Error: "Firestore not initialized"
**Solution**: Enable Firestore in Firebase Console

### Profile page not showing
**Solution**: Check browser console for errors

### User not redirected after profile completion
**Solution**: Check if document was created in Firestore

## 🚀 Production Checklist

Before deploying:

1. **Update Firestore Rules** to production mode:
```javascript
allow read: if request.auth != null;
allow create: if request.auth != null && request.auth.uid == userId;
```

2. **Add indexes** if needed (Firebase will prompt)

3. **Enable backup** in Firestore settings

4. **Monitor usage** in Firebase Console

## 📚 Resources

- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Console](https://console.firebase.google.com/project/roomsetu-c5136)

---

**Next**: Enable Firestore and test the complete flow! 🎉
