// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tms-grah.firebaseapp.com",
  projectId: "tms-grah",
  storageBucket: "tms-grah.appspot.com",
  messagingSenderId: "930390378193",
  appId: "1:930390378193:web:c2f269b08d25028e11e7f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);