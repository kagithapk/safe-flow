import db from '@/lib/firebase/firestore';
import { IApp } from '@/models/apps';
import { STATUS } from '@/utils/constants';
import { SAFE_FLOW_APPS_COLLECTION_NAME } from '@/utils/firebase/firebase-collections';
import { doc, getDoc } from '@firebase/firestore';

export async function getAppDetails(appId: string) {
	const safeFlowAppsDocRef = doc(db, SAFE_FLOW_APPS_COLLECTION_NAME, appId);

	const appRef = await getDoc(safeFlowAppsDocRef);

	if (appRef.exists()) {
		const appDetails = appRef.data();

		return {
			status: STATUS.success,
			app: appDetails as IApp,
		};
	}

	return {
		status: STATUS.fail,
		message: 'App does not exist.',
	};
}
