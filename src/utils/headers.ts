import { cookies, headers } from 'next/headers';
import { getUserPayload } from './user-payload';
import { STATUS } from './constants';

export async function getUserDetails() {
	const headersList = await headers();
	const cookieStore = await cookies();
	const userHeaders = headersList.get('x-user');

	if (!userHeaders) {
		cookieStore.delete('token');

		return {
			status: STATUS.fail,
			message: 'No user headers',
		};
	}
	const userDetails = getUserPayload(userHeaders);

	return {
		status: STATUS.success,
		user: userDetails,
	};
}
