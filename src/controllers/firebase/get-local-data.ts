import { getDocs, collection } from 'firebase/firestore';
import db from '@/lib/firebase/firestore';

export async function getLocalData() {
	try {
		const safeFlowDocRef = collection(db, 'safe_flow');

		const querySnapshot = await getDocs(safeFlowDocRef);

		const docs: Record<string, unknown> = {};
		querySnapshot.forEach((doc) => {
			docs[`${doc.id}`] = doc.data();
		});

		return docs;
	} catch (e) {
		console.error(e);
		return {};
	}
}
