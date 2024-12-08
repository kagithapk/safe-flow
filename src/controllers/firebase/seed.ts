import { doc, Timestamp, collection, writeBatch } from 'firebase/firestore';
import db from '@/lib/firebase/firestore';
import { getHashValue } from '@/utils/bcrypt';
import {
	APPS_COLLECTION_NAMES,
	SAFE_FLOW_APPS_COLLECTION_NAME,
	SAFE_FLOW_COLLECTION_NAME,
} from '@/utils/firebase/firebase-collections';

export async function seed() {
	const safeFlowDocRef = doc(db, SAFE_FLOW_COLLECTION_NAME, 'username_01');
	const password = getHashValue('password@123');
	const passwordsDocRef = doc(
		collection(
			db,
			SAFE_FLOW_COLLECTION_NAME,
			'username_01',
			APPS_COLLECTION_NAMES.PASSWORD_MANAGER
		)
	);

	// Get a new write batch
	const batch = writeBatch(db);

	// Set the value
	batch.set(safeFlowDocRef, {
		apps: [APPS_COLLECTION_NAMES.PASSWORD_MANAGER],
		created_at: Timestamp.now(),
		email: 'username_01@safeflow.com',
		first_name: 'Safeflow',
		last_name: 'User 01',
		mobile_settings: {
			theme: 'DARK',
			two_factor_auth: 'BIOMETRIC',
		},
		password,
		role: 'SUPER_ADMIN',
		status: 'ACTIVE',
		updated_at: Timestamp.now(),
		username: 'username_01',
		web_settings: {
			theme: 'DARK',
		},
	});

	// Set the value
	batch.set(passwordsDocRef, {
		additional: {},
		app_name: 'Facebook',
		email: 'username_01@safeflow.com',
		password: 'password@123',
		phone_number: '',
		updated_at: Timestamp.now(),
		username: 'username_01',
	});

	const safeFlowAppsDocRef = doc(
		db,
		SAFE_FLOW_APPS_COLLECTION_NAME,
		'password_manager'
	);

	// Set the value
	batch.set(safeFlowAppsDocRef, {
		name: 'Password Manager',
		path: '/password-manager',
		created_at: Timestamp.now(),
		updated_at: Timestamp.now(),
		created_by: doc(db, SAFE_FLOW_COLLECTION_NAME, 'username_01'),
		updated_by: doc(db, SAFE_FLOW_COLLECTION_NAME, 'username_01'),
	});

	// Commit the batch
	await batch.commit();
}
