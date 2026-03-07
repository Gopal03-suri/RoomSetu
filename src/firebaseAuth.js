import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore (lazy initialization)
let db = null;
const getDb = () => {
  if (!db) {
    const { getFirestore } = require('firebase/firestore');
    db = getFirestore(app);
  }
  return db;
};

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Add scopes if needed
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    
    console.log('Google Sign-In successful:', user.email);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
  } catch (error) {
    console.error('Google sign in error:', error);
    
    // Handle specific error codes
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Login was cancelled. Please try again.');
    } else if (error.code === 'auth/unauthorized-domain') {
      throw new Error('This domain is not authorized for OAuth login. Please contact support.');
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Google login is not enabled. Please contact support.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Network error. Please check your internet connection.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Only one popup allowed at a time.');
    }
    
    throw error;
  }
};

// GitHub Sign In
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email?.split('@')[0],
      photoURL: user.photoURL
    };
  } catch (error) {
    console.error('GitHub sign in error:', error);
    throw error;
  }
};

// Check if user exists in Firestore
export const checkUserExists = async (uid) => {
  try {
    const { getFirestore } = await import('firebase/firestore');
    const firestore = getFirestore(app);
    const userDoc = await getDoc(doc(firestore, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error checking user in Firestore:', error);
    // Return null instead of throwing to allow fallback to backend check
    return null;
  }
};

// Create user profile in Firestore
export const createUserProfile = async (uid, profileData) => {
  try {
    const { getFirestore } = await import('firebase/firestore');
    const firestore = getFirestore(app);
    await setDoc(doc(firestore, 'users', uid), {
      uid,
      email: profileData.email,
      name: profileData.name,
      phone: profileData.phone || '',
      role: profileData.role || 'tenant',
      city: profileData.city || '',
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Sign out from Firebase
export const signOutFirebase = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('Firebase sign out successful');
  } catch (error) {
    console.error('Firebase sign out error:', error);
    throw error;
  }
};

// Get current auth state
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Phone Sign In - Setup
export const setupRecaptcha = (containerId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response) => {
      console.log('reCAPTCHA solved', response);
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
};

// Phone Sign In - Send OTP
export const sendOTP = async (phoneNumber) => {
  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('OTP send error:', error);
    throw error;
  }
};

// Phone Sign In - Verify OTP
export const verifyOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;
    return {
      phone: user.phoneNumber,
      name: user.phoneNumber,
      avatar: 'PH',
      uid: user.uid
    };
  } catch (error) {
    console.error('OTP verify error:', error);
    throw error;
  }
};

export { auth };

