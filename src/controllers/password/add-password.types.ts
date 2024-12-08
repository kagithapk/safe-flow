import { STATUS } from '@/utils/constants';

export interface IPasswordFixedFields {
	app_name: string;
	username?: string;
	email?: string;
	password: string;
	phone_number?: string;
}

export type IPasswordState = Record<string, string> & IPasswordFixedFields;

export type IPasswordResult =
	| {
			data?: IPasswordState;
			status?: STATUS;
			errors?: {
				app_name?: string;
				password?: string;
				general?: string;
			};
			message?: string;
	  }
	| undefined;
