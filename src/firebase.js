// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAz8lloGspHkuE-tpdNqAgNiagxDLivvz0",
    authDomain: "my-catalog-67cec.firebaseapp.com",
    projectId: "my-catalog-67cec",
    storageBucket: "my-catalog-67cec.firebasestorage.app",
    messagingSenderId: "583750446880",
    appId: "1:583750446880:web:81d74c369b2e1ae18e7145",
    measurementId: "G-0MEXW1BW6Y",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
