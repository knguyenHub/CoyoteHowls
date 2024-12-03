import firebaseApp from "../config.js";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default async function register(req, res) {
    const { email, password, username, isFaculty } = req.body;

    // Basic field validation
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        // Check if username is unique
        const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
        const usernameSnapshot = await getDocs(usernameQuery);
        if (!usernameSnapshot.empty) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            username: username,
            isFaculty: isFaculty
        });

        res.json({ success: true });
    } catch (error) {
        let errorMessage = 'Invalid registration';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already registered.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak.';
        }
        console.error('Error registering:', error);
        res.status(400).json({ error: errorMessage });
    }
}