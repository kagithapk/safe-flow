import crypto from 'crypto';
import { STATUS } from './constants';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY;
const ivLength = 16; // For AES, this is always 16 bytes

// Encrypt Function
export const encrypt = (text: string) => {
	if (!secretKey) {
		console.log('Crypto configuration error.');
		return {
			status: STATUS.fail,
		};
	}

	const iv = crypto.randomBytes(ivLength); // Random IV for each encryption
	const cipher = crypto.createCipheriv(
		algorithm,
		Buffer.from(secretKey, 'hex'),
		iv
	);
	let encrypted = cipher.update(text, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return {
		status: STATUS.success,
		iv: iv.toString('hex'),
		encryptedData: encrypted,
	};
};

// Decrypt Function
export const decrypt = (encryptedData: string, iv: string) => {
	if (!secretKey) {
		console.log('Crypto configuration error.');
		return {
			status: STATUS.fail,
		};
	}

	const decipher = crypto.createDecipheriv(
		algorithm,
		Buffer.from(secretKey, 'hex'),
		Buffer.from(iv, 'hex')
	);
	let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return { status: STATUS.success, decrypted };
};
