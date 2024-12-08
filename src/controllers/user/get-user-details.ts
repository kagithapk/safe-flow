import db from '@/lib/firebase/firestore';
import { IUser } from '@/models/user';
import { STATUS } from '@/utils/constants';
import { SAFE_FLOW_COLLECTION_NAME } from '@/utils/firebase/firebase-collections';
import { doc, getDoc } from '@firebase/firestore';
import { getAppDetails } from '../apps';
import { IApp } from '@/models/apps';

export async function getUserDetailsByUsername(username: string) {
	try {
		const safeFlowDocRef = doc(db, SAFE_FLOW_COLLECTION_NAME, username);

		const userRef = await getDoc(safeFlowDocRef);

		if (userRef.exists()) {
			return {
				user: userRef.data() as IUser,
				status: STATUS.success,
			};
		}

		return {
			message: 'User does not exist.',
			status: STATUS.fail,
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'Something went wrong. Please try again later.',
			status: STATUS.fail,
		};
	}
}

export async function getUserAppsByUsername(username: string) {
	const appDetails: Array<IApp> = [];
	try {
		const safeFlowDocRef = doc(db, SAFE_FLOW_COLLECTION_NAME, username);

		const userRef = await getDoc(safeFlowDocRef);

		if (userRef.exists()) {
			const userApps = (userRef.data()?.apps ?? []) as IUser['apps'];

			for (let i = 0; i < userApps.length; i += 1) {
				const { status, app } = await getAppDetails(userApps[i]);

				if (status === STATUS.success && app) {
					appDetails.push(app);
				}
			}

			return {
				apps: appDetails,
				status: STATUS.success,
			};
		}

		return {
			apps: appDetails,
			message: 'User does not exist.',
			status: STATUS.fail,
		};
	} catch (e) {
		console.log(e);
		return {
			apps: appDetails,
			message: 'Something went wrong. Please try again later.',
			status: STATUS.fail,
		};
	}
}
