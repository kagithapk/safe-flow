'use server';
import { REGISTRATION_APP_CODE, STATUS } from '@/utils/constants';
import { ISignup, ISignupData } from './signup.types';
import { createUser } from './create-user';

export async function signup(
	state: ISignup,
	formData: FormData
): Promise<ISignup> {
	const first_name = formData.get('first_name');
	const last_name = formData.get('last_name');
	const email = formData.get('email');
	const password = formData.get('password');
	const app_code = formData.get('app_code');

	const userInput = {
		first_name,
		last_name,
		email,
		password,
		app_code,
	};

	if (
		!app_code ||
		!`${app_code}`?.trim() ||
		app_code !== REGISTRATION_APP_CODE
	) {
		return {
			data: userInput,
			errors: {
				app_code: 'Invalid App Code',
			},
		} as ISignup;
	}

	if (!email || !(email as string)?.trim()) {
		return {
			data: userInput,
			errors: {
				email: 'Email is required',
			},
		} as ISignup;
	}

	if (!first_name || !`$first_name`?.trim()) {
		return {
			data: userInput,
			errors: {
				first_name: 'First Name cannot be empty',
			},
		} as ISignup;
	}

	if (!last_name || !`${last_name}`?.trim()) {
		return {
			data: userInput,
			errors: {
				last_name: 'Last Name cannot be empty',
			},
		} as ISignup;
	}

	if (!password || !`${password}`?.trim()) {
		return {
			data: userInput,
			errors: {
				password: 'Password is required',
			},
		} as ISignup;
	}

	try {
		const data = await createUser(userInput as ISignupData);

		if (data?.status === STATUS.fail) {
			if (data?.field === 'email') {
				return {
					status: STATUS.fail,
					data: userInput as ISignupData,
					errors: {
						email: data?.message,
					},
				};
			}
			return {
				status: STATUS.fail,
				data: userInput as ISignupData,
				errors: {
					general: data?.message,
				},
			};
		}

		return {
			status: STATUS.success,
			data: userInput as ISignupData,
			message: 'Registration successful',
		};
	} catch (e) {
		console.log(e);
		return {
			status: STATUS.fail,
			data: userInput as ISignupData,
			errors: {
				general: 'Something went wrong. Please try again later.',
			},
		};
	}
}
