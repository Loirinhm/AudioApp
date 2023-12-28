/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm_e_nHRF7mq1FoS7LMFt9ftvDWaAGEVo",
  authDomain: "audioapp-6a69a.firebaseapp.com",
  projectId: "audioapp-6a69a",
  storageBucket: "audioapp-6a69a.appspot.com",
  messagingSenderId: "1062586678407",
  appId: "1:1062586678407:web:5e39a05558ec8159a10c22"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);
