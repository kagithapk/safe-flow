import { doc, getDoc } from 'firebase/firestore';
import db from '@/lib/firebase/firestore';
import { getUsernameFromEmail } from '@/utils/username';
import { SAFE_FLOW_COLLECTION_NAME } from '@/utils/firebase/firebase-collections';
import { compareHashWithPlainString } from '@/utils/bcrypt';
import { IUser } from '@/models/user';
import { STATUS } from '@/utils/constants';

export const validateUserCredentials = async (
	email: string,
	password: string
) => {
	try {
		const username = getUsernameFromEmail(email);
		const safeFlowDocRef = doc(db, SAFE_FLOW_COLLECTION_NAME, username);

		const userAccountSnap = await getDoc(safeFlowDocRef);

		// check if user exists
		if (!userAccountSnap.exists()) {
			return {
				status: STATUS.fail,
				field: 'email',
				message: `User account with email ${email} does not exists. Please sign up.`,
			};
		}

		const userAccount = userAccountSnap.data();

		const isPasswordMatch = compareHashWithPlainString(
			password,
			userAccount?.password
		);

		if (!isPasswordMatch) {
			return {
				status: STATUS.fail,
				message: 'Email and password does not match.',
			};
		}

		return {
			status: STATUS.success,
			user: userAccount as IUser,
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Could not login. Please try again later.',
		};
	}
};
