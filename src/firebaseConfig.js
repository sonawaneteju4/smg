// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8hjlJS4wd1rJPS7NsUdKoT4MnwkqYfh8",
  authDomain: "smgbackend-2ae76.firebaseapp.com",
  databaseURL: "https://smgbackend-2ae76-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smgbackend-2ae76",
  storageBucket: "smgbackend-2ae76.appspot.com",
  messagingSenderId: "55558814674",
  appId: "1:55558814674:web:549cc2e627895b82d7a60b",
  measurementId: "G-GMJS7D1001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore()