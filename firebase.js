// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "freshfeast-2.firebaseapp.com",
  projectId: "freshfeast-2",
  storageBucket: "freshfeast-2.firebasestorage.app",
  messagingSenderId: "761929634289",
  appId: "1:761929634289:web:0a3df1b490c8145aabf450"
};
console.log("Firebase Connected")

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)


export {auth, app}