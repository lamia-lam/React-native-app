
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../config/firebase";

// Register a new user
export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  // Create account in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Save user profile in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    fullName: fullName,
    email: user.email,
    createdAt: serverTimestamp(),
  });

  return userCredential;
};

// Login an existing user
export const loginUser = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

// Logout user
export const logoutUser = async () => {
  return await signOut(auth);
};
