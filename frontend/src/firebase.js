// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrjhyKRvZo_qSKnwd-lL5QtiJEePyT6Fc",
  authDomain: "app1-7237b.firebaseapp.com",
  projectId: "app1-7237b",
  storageBucket: "app1-7237b.firebasestorage.app",
  messagingSenderId: "646453099639",
  appId: "1:646453099639:web:9145b283469f90bd7f1a72",
  measurementId: "G-26X0D34BJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);