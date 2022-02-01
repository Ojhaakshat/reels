// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzEE5q9BkfUZY281hIU07OlLf5KDov3QA",
    authDomain: "reels-fac4b.firebaseapp.com",
    projectId: "reels-fac4b",
    storageBucket: "reels-fac4b.appspot.com",
    messagingSenderId: "573843889620",
    appId: "1:573843889620:web:8aa24f17f6d0fadd960a41"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    getTimeStamp: firebase.firestore.FieldValue.getTimeStamp
}

export const storage = firebase.storage()