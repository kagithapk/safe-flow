import { getUserDetailsByUsername } from '@/controllers/user/get-user-details';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ username: string }> }
) {
	try {
		const { username } = await params;
		console.log(username);
		const response = await getUserDetailsByUsername('');

		return NextResponse.json({ response, username });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: 'Unable to fetch data.' });
	}
}
