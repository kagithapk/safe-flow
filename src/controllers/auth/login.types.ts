import { STATUS } from '@/utils/constants';

export type ILoginData = {
	email: string;
	password: string;
};
export type ILogin =
	| {
			data: ILoginData;
			status: STATUS;
			errors?: {
				email?: string;
				password?: string;
				general?: string;
			};
			message?: string;
	  }
	| undefined;
