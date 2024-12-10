// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABBHsJJOnsnDPUyvfX9uKt8Hkj-k89ygQ",
  authDomain: "netflixgpt-6076d.firebaseapp.com",
  projectId: "netflixgpt-6076d",
  storageBucket: "netflixgpt-6076d.firebasestorage.app",
  messagingSenderId: "138427081433",
  appId: "1:138427081433:web:5ed2a38f40c3b41c9314c8",
  measurementId: "G-QYD6JVZLPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();