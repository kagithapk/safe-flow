import { deleteDoc, doc, getDoc } from '@firebase/firestore';
import db from '@/lib/firebase/firestore';
import { STATUS } from '@/utils/constants';
import {
	APPS_COLLECTION_NAMES,
	SAFE_FLOW_COLLECTION_NAME,
} from '@/utils/firebase/firebase-collections';

export async function deletePassword(username: string, id: string) {
	try {
		const passwordRef = doc(
			db,
			SAFE_FLOW_COLLECTION_NAME,
			username,
			APPS_COLLECTION_NAMES.PASSWORD_MANAGER,
			id
		);

		const passwordDoc = await getDoc(passwordRef);

		if (!passwordDoc.exists()) {
			return {
				status: STATUS.fail,
				message: 'Unable to update, could not fetch the record.',
			};
		}

		await deleteDoc(passwordRef);

		return {
			status: STATUS.success,
			message: 'Successfully deleted.',
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Something went wrong. Please try again later.',
		};
	}
}
