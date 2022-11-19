// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJW5IR2GkcTdZ6nMCjCKCAxdujrxLq4-g",
  authDomain: "nextjs-firebase-demo-8b54e.firebaseapp.com",
  projectId: "nextjs-firebase-demo-8b54e",
  storageBucket: "nextjs-firebase-demo-8b54e.appspot.com",
  messagingSenderId: "282709549323",
  appId: "1:282709549323:web:75463719060192f50ec20e",
  measurementId: "G-1MTGZPTG6P",
};

// Initialize Firebase
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const db = getFirestore();
