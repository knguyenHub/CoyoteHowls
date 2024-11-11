import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import dotenv from 'dotenv';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBbKIUxj0fQAmXttN-ITZwewFix7jGnAs",
    authDomain: "chfaculty-a0d95.firebaseapp.com",
    projectId: "chfaculty-a0d95",
    storageBucket: "chfaculty-a0d95.appspot.com",
    messagingSenderId: "265488789575",
    appId: "1:265488789575:web:aaabfd814afb14a5408162"
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