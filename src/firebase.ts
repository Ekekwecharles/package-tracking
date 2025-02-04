// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEC2AiZKQtZTY09tUFCD4Y4pyX7ZAofWg",
  authDomain: "tracking-edac1.firebaseapp.com",
  projectId: "tracking-edac1",
  storageBucket: "tracking-edac1.firebasestorage.app",
  messagingSenderId: "670489100487",
  appId: "1:670489100487:web:748ef078dda9f0bb0e7ee2",
  measurementId: "G-JD5XFXZ6RX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, doc, getDoc, updateDoc };
