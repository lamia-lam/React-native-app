
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjOjILpRbVTFqNTcMSXMajuYiaJGEIzmg",
   authDomain: "bookbuddy-4c051.firebaseapp.com",
   projectId: "bookbuddy-4c051",
   storageBucket: "bookbuddy-4c051.firebasestorage.app",
   messagingSenderId: "1027753122965",
   appId: "1:1027753122965:web:56aa9e37515f77e28b8f9c"
};

// Initialize Firebase
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// Persist authentication on the device
const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
})();

const db = getFirestore(app);

export { app, auth, db };
