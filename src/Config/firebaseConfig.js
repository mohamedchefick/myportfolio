// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore ,collection , addDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyDog3jGcYp17pr3k_GoFIn-WfbJoGWpMws",
  authDomain: "myportfolio-77171.firebaseapp.com",
  projectId: "myportfolio-77171",
  storageBucket: "myportfolio-77171.appspot.com",
  messagingSenderId: "1070582929393",
  appId: "1:1070582929393:web:31049548fdec8018ad1650",
  measurementId: "G-NMV19QZ9G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection , addDoc};
