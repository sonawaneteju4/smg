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
  apiKey: "AIzaSyD2R7JOB5kXdJhwmxM1IKbmMoOQCBynd3U",
  authDomain: "shrirammedicalprod.firebaseapp.com",
  projectId: "shrirammedicalprod",
  storageBucket: "shrirammedicalprod.appspot.com",
  messagingSenderId: "288715427611",
  appId: "1:288715427611:web:fc964894a602647704cdbe",
  measurementId: "G-5GWN6NVXDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore()