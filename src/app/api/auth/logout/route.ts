import { NextResponse } from 'next/server';
import { logout } from '@/controllers/auth/logout-user';

export async function POST() {
	try {
		await logout();

		return NextResponse.json({ message: 'Successfully logged out.' });
	} catch (e) {
		console.error(e);
		return NextResponse.json({
			message: 'Something went wrong. Please try again later.',
		});
	}
}
