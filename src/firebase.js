// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCgZuJNvdPY3_lPAXAzi2t3lhl9nDWQVgI",
    authDomain: "web-rep.firebaseapp.com",
    projectId: "web-rep",
    storageBucket: "web-rep.firebasestorage.app",
    messagingSenderId: "57582887658",
    appId: "1:57582887658:web:610f4590e28a23621cad93",
    measurementId: "G-NVZDDVHLDM", // можно оставить, но он не нужен
};

const app = initializeApp(firebaseConfig);

// 👇 это единственное, что нам нужно
export const auth = getAuth(app);
