import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHbS1TuhUYntb3jHckXcTlQuj7zEvS-kA",
  authDomain: "hotel-management-system-48b99.firebaseapp.com",
  projectId: "hotel-management-system-48b99",
  storageBucket: "hotel-management-system-48b99.firebasestorage.app",
  messagingSenderId: "977254068994",
  appId: "1:977254068994:web:0f6737d695d512486f881b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };