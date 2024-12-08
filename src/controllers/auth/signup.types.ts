import { STATUS } from '@/utils/constants';

export type ISignupData = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	app_code: string;
};
export type ISignup =
	| {
			data?: ISignupData;
			status?: STATUS;
			errors?: {
				first_name?: string;
				last_name?: string;
				email?: string;
				password?: string;
				app_code?: string;
				general?: string;
			};
			message?: string;
	  }
	| undefined;
