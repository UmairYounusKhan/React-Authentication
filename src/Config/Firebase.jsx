// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAF0IjjJAi8UTy4Z5kxPHbFyQ_ZCEEdL4",
  authDomain: "react-authentication-b36f6.firebaseapp.com",
  projectId: "react-authentication-b36f6",
  storageBucket: "react-authentication-b36f6.appspot.com",
  messagingSenderId: "848590512050",
  appId: "1:848590512050:web:62d4a0d1a08658cd8e4eab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;