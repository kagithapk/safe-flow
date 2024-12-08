import { Timestamp } from '@firebase/firestore';

export interface IPasswordAddBody {
	app_name: string;
	additional?: Record<string, string>;
	email?: string;
	password?: string;
	iv?: string;
	phone_number?: string;
	updated_at: Timestamp;
	username?: string;
}

export interface IPassword {
	id: string;
	app_name: string;
	additional?: Record<string, string>;
	email?: string;
	password?: string;
	iv?: string;
	phone_number?: string;
	updated_at: Timestamp;
	username?: string;
}

export interface IPasswordConvert {
	id: string;
	app_name: string;
	additional?: string;
	email?: string;
	password?: string;
	phone_number?: string;
	updated_at: string;
	username?: string;
}
