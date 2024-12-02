import firebaseApp from "../config.js";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default async function login(req, res) {
    const { emailOrUsername, password } = req.body;

    try {
        let userCredential;

        if (emailOrUsername.includes('@')) {
            // Sign in directly with email
            userCredential = await signInWithEmailAndPassword(auth, emailOrUsername, password);
        } else {
            // Find email by username in Firestore first
            const userQuery = query(collection(db, 'users'), where('username', '==', emailOrUsername));
            const querySnapshot = await getDocs(userQuery);
            if (querySnapshot.empty) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            userCredential = await signInWithEmailAndPassword(auth, userData.email, password);
        }

        // Fetch Firestore user data after successful login
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userData = userDoc.data();

        return res.json({ success: true, isFaculty: userData.isFaculty });
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            return res.status(401).json({ error: 'Invalid password' });
        } else if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ error: 'User not found' });
        } else {
            console.error('Error logging in:', error);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }
}