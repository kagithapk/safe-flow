import { Timestamp } from '@firebase/firestore';

export interface IApp {
	created_at: Timestamp;
	created_by: string;
	name: string;
	path: string;
	updated_at: Timestamp;
	updated_by: string;
}
