// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-910f6.firebaseapp.com",
  projectId: "mern-state-910f6",
  storageBucket: "mern-state-910f6.appspot.com",
  messagingSenderId: "546063923599",
  appId: "1:546063923599:web:0f7e37942ff0a8f69fb3fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);