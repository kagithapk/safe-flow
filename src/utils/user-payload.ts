import { IUser } from '@/models/user';

export interface IUserPaylaod {
	username: IUser['username'];
	role: IUser['role'];
	mobile_settings: IUser['mobile_settings'];
	web_settings: IUser['web_settings'];
}

export function getUserPayload(userPayload: string): IUserPaylaod {
	return JSON.parse(userPayload);
}

export function getStringifyUserPayload(userDetails: IUserPaylaod) {
	return JSON.stringify(userDetails);
}
