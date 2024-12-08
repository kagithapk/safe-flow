import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import firebaseApp from './config';
import { isLocal } from '@/utils/environment';

const HOST = '127.0.0.1';
const PORT = 8080;

const db = getFirestore(firebaseApp);

if (isLocal()) {
	connectFirestoreEmulator(db, HOST, PORT);
}

export default db;
