// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByVcUdEQEs74XggXRY2HJx_X0C6XU0tZc",
  authDomain: "swp-etransportation.firebaseapp.com",
  projectId: "swp-etransportation",
  storageBucket: "swp-etransportation.appspot.com",
  messagingSenderId: "39882221478",
  appId: "1:39882221478:web:32de51945ebf9d7f619167",
  measurementId: "G-J1L8T5V5B2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }
