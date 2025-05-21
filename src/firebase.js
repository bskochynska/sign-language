import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import { setLogLevel } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "sign-language-ai-13704.firebaseapp.com",
  projectId: "sign-language-ai-13704",
  storageBucket: "sign-language-ai-13704.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
setLogLevel('debug');

export { firebase, auth, db};

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCVCIaSQJWy4iEzcl1ozlRtLVIauVzs_QE",
//   authDomain: "sign-language-ai-13704.firebaseapp.com",
//   projectId: "sign-language-ai-13704",
//   storageBucket: "sign-language-ai-13704.firebasestorage.app",
//   messagingSenderId: "84907049940",
//   appId: "1:84907049940:web:dfe6193ca83d9904254c41",
//   measurementId: "G-7X32PBP220"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);   - не тре








// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const db = firebase.firestore();

// export { firebase, auth, db};