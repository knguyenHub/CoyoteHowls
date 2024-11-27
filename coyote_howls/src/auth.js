import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBbKIUxj0fQAmXttN-ITZwewFix7jGnAs",
    authDomain: "chfaculty-a0d95.firebaseapp.com",
    projectId: "chfaculty-a0d95",
    storageBucket: "chfaculty-a0d95.appspot.com",
    messagingSenderId: "265488789575",
    appId: "1:265488789575:web:aaabfd814afb14a5408162",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export `auth` and `db` for use in other parts of the app
export { auth, db };

// Register a new user and create a Firestore document
export const register = async (email, password, name, role) => {
    try {
        // Create a new user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save the user's details in Firestore with their UID as the document ID
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid, // Explicitly store the UID
            name,
            email,
            role,
            availability: role === "faculty" ? {} : null, // Default availability for faculty
            notifications: [], // Empty notifications array
            meetings: [], // Empty meetings array
        });

        console.log("User registered and Firestore document created:", user.uid);
        return user;
    } catch (error) {
        console.error("Error registering new user:", error);

        // Throw a user-friendly error message
        if (error.code === "auth/email-already-in-use") {
            throw new Error("This email address is already in use. Please try another one.");
        } else if (error.code === "auth/weak-password") {
            throw new Error("The password is too weak. Please use a stronger password.");
        } else {
            throw new Error("Failed to register. Please try again later.");
        }
    }
};

// Login an existing user
export const login = async (email, password) => {
    try {
        // Authenticate the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user.uid);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in user:", error);

        // Throw a user-friendly error message
        if (error.code === "auth/wrong-password") {
            throw new Error("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
            throw new Error("No account found with this email. Please register first.");
        } else {
            throw new Error("Failed to log in. Please try again later.");
        }
    }
};

// Logout the current user
export const logout = async () => {
    try {
        // Sign the user out
        await signOut(auth);
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw new Error("Failed to log out. Please try again later.");
    }
};
