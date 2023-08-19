import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDafPlIC7Kj5t7HHSsOJXeNFD-uIm9opFY",
  authDomain: "smit-hackathon-2894d.firebaseapp.com",
  projectId: "smit-hackathon-2894d",
  storageBucket: "smit-hackathon-2894d.appspot.com",
  messagingSenderId: "673603256344",
  appId: "1:673603256344:web:0a3860148e99ec5ea9036d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getAuth,
  createUserWithEmailAndPassword,
  query,
  where,
  getDocs,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
 
};

