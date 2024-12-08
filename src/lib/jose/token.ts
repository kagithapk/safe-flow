import { STATUS } from '@/utils/constants';
import { IUserPaylaod } from '@/utils/user-payload';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function generateToken(data: JWTPayload) {
	if (JWT_SECRET_KEY) {
		try {
			return {
				status: STATUS.success,
				token: await new SignJWT(data)
					.setProtectedHeader({ alg: 'HS256' })
					.sign(JWT_SECRET_KEY),
				message: 'Token generated successfully',
			};
		} catch (e) {
			console.log(e);
			return {
				status: STATUS.fail,
				message: 'Somthing went wrong',
			};
		}
	}

	console.log('Error in token secret configuration');

	return {
		status: STATUS.fail,
		message: 'Error in token secret configuration',
	};
}

export async function validateToken(token: string) {
	try {
		if (JWT_SECRET_KEY) {
			const data = await jwtVerify<IUserPaylaod>(token, JWT_SECRET_KEY);

			return {
				status: STATUS.success,
				data,
			};
		}

		console.log('Error in token secret configuration');

		return {
			status: STATUS.fail,
			message: 'Error in token secret configuration',
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			message: 'Invalid token',
		};
	}
}
