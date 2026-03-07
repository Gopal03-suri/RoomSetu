import { signInWithGoogle, checkUserExists, createUserProfile, signOutFirebase } from './firebaseAuth';
import { api } from './api';

// Google Sign In - wraps the Firebase function
export const loginWithGoogle = async () => {
  try {
    const userData = await signInWithGoogle();
    console.log('Google sign in successful, userData:', userData);
    return userData;
  } catch (error) {
    console.error('Google login error in authService:', error);
    throw error;
  }
};

// Helper function to add timeout to promises
const withTimeout = (promise, ms, errorMessage = 'Request timed out') => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(errorMessage)), ms)
    )
  ]);
};

// Check if user exists in any backend
export const checkUserInBackends = async (userData) => {
  const { uid, email } = userData;
  
  // First try to check in Firestore (with timeout)
  try {
    const userProfile = await withTimeout(checkUserExists(uid), 5000, 'Firestore check timeout');
    if (userProfile) {
      console.log('User exists in Firestore:', userProfile);
      return { exists: true, source: 'firestore', user: userProfile };
    }
  } catch (err) {
    console.log('Error checking Firestore user:', err.message);
  }
  
  // Then try Django backend (with timeout)
  try {
    const djangoResponse = await withTimeout(api.checkUserByEmail(email), 5000, 'Backend check timeout');
    if (djangoResponse.exists) {
      console.log('User exists in Django backend:', djangoResponse.user);
      return { exists: true, source: 'django', user: djangoResponse.user };
    }
  } catch (err) {
    console.log('Error checking Django user:', err.message);
  }
  
  // User doesn't exist anywhere
  return { exists: false, source: null, user: null };
};

// Create user in backend after Google signup
export const createUserInBackend = async (userData, role, city) => {
  const { uid, email, displayName } = userData;
  
  // Create in Firestore (with timeout - non-blocking)
  try {
    await withTimeout(createUserProfile(uid, {
      email,
      name: displayName || email.split('@')[0],
      phone: '',
      role,
      city
    }), 5000, 'Firestore timeout');
    console.log('User created in Firestore');
  } catch (err) {
    console.log('Error creating in Firestore:', err.message);
  }
  
  // Also try to create in Django backend (with timeout - non-blocking)
  try {
    const nameParts = (displayName || email.split('@')[0]).trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const username = email.split('@')[0];
    
    await withTimeout(api.signup({
      username,
      email,
      password: `google_${uid}`, // Placeholder for Google users
      first_name: firstName,
      last_name: lastName,
      role,
      city,
      phone: '',
      uid
    }), 5000, 'Django timeout');
    console.log('User created in Django backend');
  } catch (err) {
    console.log('Error creating in Django (non-critical):', err.message);
  }
};

// Sign out
export const logoutUser = async () => {
  try {
    await signOutFirebase();
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Re-export for backward compatibility
export { signInWithGoogle, checkUserExists, createUserProfile };

