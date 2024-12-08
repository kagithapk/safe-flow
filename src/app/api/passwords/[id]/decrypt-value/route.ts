import { NextRequest, NextResponse } from 'next/server';
import { STATUS } from '@/utils/constants';
import { getUserDetails } from '@/utils/headers';
import { getPasswordByUsernameAndId } from '@/controllers/password/get-passwords';
import { decrypt } from '@/utils/crypto';

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id: passwordsId } = await params;
		if (!passwordsId) {
			return NextResponse.json(
				{
					message: 'Invalid Id',
				},
				{
					status: 400,
				}
			);
		}

		const { status: userStatus, user: userDetails } = await getUserDetails();

		if (userStatus === STATUS.fail || !userDetails?.username) {
			return NextResponse.json(
				{
					message: 'User authentication fail. Please login.',
				},
				{
					status: 401,
				}
			);
		}

		const encryptedValue = req.nextUrl.searchParams.get('encrypted-value');

		if (!encryptedValue) {
			return NextResponse.json({
				password: '',
			});
		}

		const { status, password } = await getPasswordByUsernameAndId(
			userDetails.username,
			passwordsId
		);

		if (
			!password ||
			status === STATUS.fail ||
			password?.password !== encryptedValue ||
			!password?.iv
		) {
			return NextResponse.json(
				{
					message: `The value ${encryptedValue} is corrupted`,
				},
				{
					status: 403,
				}
			);
		}

		const { status: decryptStatus, decrypted } = decrypt(
			encryptedValue,
			password?.iv
		);

		if (decryptStatus === STATUS.fail || !decrypted) {
			return NextResponse.json({
				message: 'Something went wrong. Please try again later.',
			});
		}

		return NextResponse.json({ decrypted });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: 'Unable to fetch data.' });
	}
}
