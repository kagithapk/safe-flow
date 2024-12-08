import { bcrypt, SALT } from '@/lib/bcrypt';

export const getHashValue = (password: string) => {
	try {
		if (!SALT) {
			throw Error('Encryption configuration error');
		}
		const salt = bcrypt.genSaltSync(+SALT);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	} catch (e) {
		console.error(e);
		return '';
	}
};

export const compareHashWithPlainString = (password: string, hash: string) => {
	try {
		const isMatch = bcrypt.compareSync(password, hash);
		return isMatch;
	} catch (e) {
		console.error(e);
		return false;
	}
};
