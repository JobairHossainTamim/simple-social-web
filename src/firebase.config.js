// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq_karOPAf89M8O2rW_kaVSOdFFtJESI0",
  authDomain: "social-lite-app.firebaseapp.com",
  projectId: "social-lite-app",
  storageBucket: "social-lite-app.appspot.com",
  messagingSenderId: "538321712702",
  appId: "1:538321712702:web:f9dc61c2e4973ac4dd436f",
  measurementId: "G-Z5VLYMLPD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDb=getFirestore(app);

export {app , fireDb}