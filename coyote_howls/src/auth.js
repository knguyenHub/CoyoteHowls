import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import dotenv from 'dotenv';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJzC5r1rrzRpjySIwWz9R0Lta1wSrfb7E",
    authDomain: "coyotehowls-e5ee5.firebaseapp.com",
    projectId: "coyotehowls-e5ee5",
    storageBucket: "coyotehowls-e5ee5.firebasestorage.app",
    messagingSenderId: "130151017664",
    appId: "1:130151017664:web:685e9676b0f4a4d1eb9125"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Register new user
export const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error registering new user:", error);
        throw error;
    }
};

// Login existing user
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

// Logout user
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};

// Send password reset email
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};
//Initialize data base
export const db = getFirestore(app);
