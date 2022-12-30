import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNhYqXBcBO1B7A6fq1o6XNZyimV9RNf9I",
  authDomain: "linkedin-clone-f330f.firebaseapp.com",
  projectId: "linkedin-clone-f330f",
  storageBucket: "linkedin-clone-f330f.appspot.com",
  messagingSenderId: "8646361723",
  appId: "1:8646361723:web:22737393865cdbe944d8de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
