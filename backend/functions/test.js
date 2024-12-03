import firebaseApp from '../config.js';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default async function test(req, res) {
    try {
        const data = await getDocs(collection(db, 'test'));
        const results = data.docs.map(doc => doc.data());
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}