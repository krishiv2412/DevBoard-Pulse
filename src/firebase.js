import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc,
  onSnapshot 
} from "firebase/firestore";

// Official NMIT DevBoard Firebase Config
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAfA4kaHxEr3sJY1qukL058fK0oMTRfZ84",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nmit-devboard.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nmit-devboard",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nmit-devboard.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "67197440416",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:67197440416:web:ad0a7e126cfac62aaf14c5",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LRTSBRL459"
};

const getStoredFirebaseConfig = () => {
  try {
    const custom = localStorage.getItem("devboard_custom_firebase_config");
    if (custom) return JSON.parse(custom);
  } catch {
    // fallback
  }
  return DEFAULT_FIREBASE_CONFIG;
};

let app;
let auth;
let db;
let isFirebaseLive = false;

try {
  const firebaseConfig = getStoredFirebaseConfig();
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  auth = getAuth(app);
  db = getFirestore(app);
  
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    isFirebaseLive = true;
  }
} catch (err) {
  console.info("DevBoard operating in seamless local mode:", err);
}

export { app, auth, db, isFirebaseLive, getStoredFirebaseConfig };
