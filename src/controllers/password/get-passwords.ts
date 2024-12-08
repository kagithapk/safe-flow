import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import db from '@/lib/firebase/firestore';
import { IPassword } from '@/models/password';
import { STATUS } from '@/utils/constants';
import {
	APPS_COLLECTION_NAMES,
	SAFE_FLOW_COLLECTION_NAME,
} from '@/utils/firebase/firebase-collections';

export async function getPasswordsListByUsername(username: string) {
	try {
		const userDoc = doc(db, SAFE_FLOW_COLLECTION_NAME, username);
		const passwordsRef = collection(
			userDoc,
			APPS_COLLECTION_NAMES.PASSWORD_MANAGER
		);

		const passwordsSnapshot = await getDocs(passwordsRef);
		const passwords: Array<IPassword> = [];

		if (passwordsSnapshot.empty) {
			return {
				status: STATUS.success,
				passwords,
			};
		}

		passwordsSnapshot.forEach((password) => {
			passwords.push({ ...password.data(), id: password.id } as IPassword);
		});

		return {
			status: STATUS.success,
			passwords,
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Something went wrong. Please try again later.',
		};
	}
}

export async function getPasswordByUsernameAndId(username: string, id: string) {
	try {
		const passwordDoc = doc(
			db,
			SAFE_FLOW_COLLECTION_NAME,
			username,
			APPS_COLLECTION_NAMES.PASSWORD_MANAGER,
			id
		);

		const passwordsRef = await getDoc(passwordDoc);

		if (passwordsRef.exists()) {
			return {
				status: STATUS.success,
				password: passwordsRef.data(),
			};
		}

		return {
			status: STATUS.fail,
			message: 'Password does not exist',
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Something went wrong. Please try again later.',
		};
	}
}
