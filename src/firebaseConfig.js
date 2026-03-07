import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCun05lUALJN2XnZzDICcbIrgEA_DYbGAM",
  authDomain: "roomsetu-c5136.firebaseapp.com",
  projectId: "roomsetu-c5136",
  storageBucket: "roomsetu-c5136.firebasestorage.app",
  messagingSenderId: "514163173119",
  appId: "1:514163173119:web:fe1f4a3871145ff1d38eca",
  measurementId: "G-QFMMVHF200"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default firebaseConfig;
