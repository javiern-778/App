import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrjhyKRvZo_qSKnwd-lL5QtiJEePyT6Fc",
  authDomain: "app1-7237b.firebaseapp.com",
  projectId: "app1-7237b",
  storageBucket: "app1-7237b.appspot.com", // ✅ corregido
  messagingSenderId: "646453099639",
  appId: "1:646453099639:web:9145b283469f90bd7f1a72",
  measurementId: "G-26X0D34BJQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
