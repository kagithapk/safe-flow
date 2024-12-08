'use server';
import { cookies } from 'next/headers';
import { ILogin, ILoginData } from './login.types';
import { redirect } from 'next/navigation';
import { validateUserCredentials } from './validate-credentials';
import { generateToken } from '@/lib/jose';
import { STATUS } from '@/utils/constants';

export async function login(
	state: ILogin,
	formData: FormData
): Promise<ILogin> {
	const cookieStore = await cookies();

	const email = formData.get('email');
	const password = formData.get('password');

	const userInput = {
		email,
		password,
	};

	if (!email || !`${email}`?.trim()) {
		return {
			status: STATUS.fail,
			data: userInput as ILoginData,
			errors: {
				email: 'Email is required',
			},
		};
	}

	if (!password || !`${password}`?.trim()) {
		return {
			status: STATUS.fail,
			data: userInput as ILoginData,
			errors: {
				password: 'Password is required',
			},
		};
	}

	const data = await validateUserCredentials(
		email as string,
		password as string
	);

	if (data?.status === STATUS.fail) {
		if (data?.field === 'email') {
			return {
				status: STATUS.fail,
				data: userInput as ILoginData,
				errors: {
					email: data?.message,
				},
			};
		}

		return {
			status: STATUS.fail,
			data: userInput as ILoginData,
			errors: {
				general: data?.message,
			},
		};
	}

	if (data?.user?.status === 'INACTIVE') {
		return {
			status: STATUS.fail,
			data: userInput as ILoginData,
			errors: {
				general:
					'User account is not active yet. Our team will review the account and enable it shortly. Thank you for the patience.',
			},
		};
	}

	if (data?.user?.status === 'BLOCKED') {
		return {
			status: STATUS.fail,
			data: userInput as ILoginData,
			errors: {
				general: 'User account is blocked.',
			},
		};
	}

	const tokenData = {
		username: data?.user?.username,
		role: data?.user?.role,
		mobile_settings: data?.user?.mobile_settings,
		web_settings: data?.user?.web_settings,
	};

	const { token, status } = await generateToken(tokenData);

	if (status === STATUS.success && token) {
		cookieStore.set('token', token);

		redirect('/');
	}

	return {
		status: STATUS.fail,
		data: userInput as ILoginData,
		errors: {
			general: 'Something went wrong. Please try again later.',
		},
	};
}
