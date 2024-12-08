import { seed, getLocalData } from '@/controllers/firebase';
import { isLocal } from '@/utils/environment';

export async function POST() {
	try {
		if (isLocal()) {
			await seed();

			return Response.json({ message: 'Seed successful' });
		}
		return Response.json({ message: 'Seed is for local development.' });
	} catch (e) {
		console.error(e);
		return Response.json({ message: 'Unable to seed.' });
	}
}

export async function GET() {
	try {
		if (isLocal()) {
			const response = await getLocalData();

			return Response.json(response);
		}
		return Response.json({ message: 'API is for local development.' });
	} catch (e) {
		console.error(e);
		return Response.json({ message: 'Unable to fetch data.' });
	}
}
