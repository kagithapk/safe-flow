import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '@/lib/firebase/firestore';
import { User } from '@/models/user';
import { getHashValue } from '@/utils/bcrypt';
import { SAFE_FLOW_COLLECTION_NAME } from '@/utils/firebase/firebase-collections';
import { getUsernameFromEmail } from '@/utils/username';
import { ISignupData } from './signup.types';
import { STATUS } from '@/utils/constants';

export const createUser = async (data: ISignupData) => {
	try {
		const { first_name, last_name, email, password } = data;

		const username = getUsernameFromEmail(email);
		const safeFlowDocRef = doc(db, SAFE_FLOW_COLLECTION_NAME, username);

		const userAccount = await getDoc(safeFlowDocRef);

		// check if user already exists
		if (userAccount.exists()) {
			return {
				status: STATUS.fail,
				field: 'email',
				message: `User account with email ${email} already exists.`,
			};
		}

		const hashedPassword = getHashValue(password);

		const user = new User({
			username,
			first_name,
			last_name,
			password: hashedPassword,
			email,
		});

		await setDoc(safeFlowDocRef, user.getUser());
		return {
			status: STATUS.success,
			message: 'Successfully created user.',
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Something went wrong. Please try again later.',
		};
	}
};
