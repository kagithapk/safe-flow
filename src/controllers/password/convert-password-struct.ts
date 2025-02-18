import { IPassword, IPasswordConvert } from '@/models/password';

export const sortPasswordsByDate = (
	passwords: Array<IPasswordConvert>
): Array<IPasswordConvert> => {
	return passwords.sort(function (a, b) {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
	});
};

export const convertPasswordStruct = (
	passwords: Array<IPassword>
): Array<IPasswordConvert> => {
	return passwords.map((password) => ({
		id: password.id,
		additional: JSON.stringify(password?.additional),
		app_name: password?.app_name,
		username: password?.username,
		email: password?.email,
		password: password?.password,
		phone_number: password?.phone_number,
		updated_at: new Date(
			password?.updated_at?.toDate()?.toISOString()
		).toLocaleString(),
	}));
};
