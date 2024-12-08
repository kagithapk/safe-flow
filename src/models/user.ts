import { Timestamp } from '@firebase/firestore';

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
type ThemeSettings = 'DARK' | 'LIGHT' | 'SYSTEM';
type UserAuthSettingsMobile = 'BIOMETRIC' | 'OFF';

export interface IUser {
	apps: Array<string>;
	created_at: Timestamp;
	email: string;
	first_name: string;
	last_name: string;
	mobile_settings: {
		theme: ThemeSettings;
		two_factor_auth: UserAuthSettingsMobile;
	};
	password: string;
	role: UserRole;
	status: UserStatus;
	updated_at: Timestamp;
	username: string;
	web_settings: {
		theme: ThemeSettings;
	};
}

interface IUserDefault {
	apps?: Array<string>;
	created_at?: Timestamp;
	email: string;
	first_name: string;
	last_name: string;
	mobile_settings?: {
		theme?: ThemeSettings;
		two_factor_auth?: UserAuthSettingsMobile;
	};
	password: string;
	role?: UserRole;
	status?: UserStatus;
	updated_at?: Timestamp;
	username: string;
	web_settings?: {
		theme?: ThemeSettings;
	};
}

const defaultUserValues: IUserDefault = {
	apps: [],
	created_at: Timestamp.now(),
	email: '',
	first_name: '',
	last_name: '',
	mobile_settings: {
		theme: 'DARK',
		two_factor_auth: 'OFF',
	},
	password: '',
	role: 'USER',
	status: 'INACTIVE',
	updated_at: Timestamp.now(),
	username: '',
	web_settings: {
		theme: 'DARK',
	},
};

export class User {
	user: IUser;

	constructor(user: IUserDefault = defaultUserValues) {
		const userRef: IUser = {
			...user,
			apps: user?.apps ?? defaultUserValues.apps!,
			created_at: user.created_at ?? Timestamp.now(),
			mobile_settings: {
				...(user?.mobile_settings ?? {}),
				theme: defaultUserValues.mobile_settings?.theme ?? 'LIGHT',
				two_factor_auth:
					defaultUserValues.mobile_settings?.two_factor_auth ?? 'OFF',
			},
			role: user.role ?? 'USER',
			status: user.status ?? 'INACTIVE',
			updated_at: Timestamp.now(),
			web_settings: {
				...(user?.web_settings ?? {}),
				theme: defaultUserValues.web_settings?.theme ?? 'LIGHT',
			},
		};

		this.user = userRef;
	}

	getUser() {
		return this.user;
	}
}
