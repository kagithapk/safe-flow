import { doc, getDoc, setDoc, Timestamp } from '@firebase/firestore';
import db from '@/lib/firebase/firestore';
import { IPasswordAddBody } from '@/models/password';
import { STATUS } from '@/utils/constants';
import {
	APPS_COLLECTION_NAMES,
	SAFE_FLOW_COLLECTION_NAME,
} from '@/utils/firebase/firebase-collections';

export async function editPassword(
	username: string,
	id: string,
	app_name: string,
	usernameField: string,
	password: string,
	iv: string,
	email?: string,
	phone_number?: string,
	additional?: Record<string, string>
) {
	try {
		const passwordRef = doc(
			db,
			SAFE_FLOW_COLLECTION_NAME,
			username,
			APPS_COLLECTION_NAMES.PASSWORD_MANAGER,
			id
		);
		const body: IPasswordAddBody = {
			app_name,
			username: usernameField,
			email,
			password,
			iv,
			phone_number,
			updated_at: Timestamp.now(),
		};

		if (additional) {
			body.additional = additional;
		}

		const passwordDoc = await getDoc(passwordRef);

		if (!passwordDoc.exists()) {
			return {
				status: STATUS.fail,
				message: 'Unable to update, could not fetch the record.',
			};
		}

		await setDoc(passwordRef, body);

		return {
			status: STATUS.success,
			message: 'Successfully modified.',
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Something went wrong. Please try again later.',
		};
	}
}
