import firebaseApp from "../config.js";
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default async function signout(req, res) {
    try {
        await signOut(auth);
        res.json({ success: true });
    } catch (error) {
        console.error('Error signing out:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}