import { NextResponse } from 'next/server';
import { getPasswordsListByUsername } from '@/controllers/password/get-passwords';
import { getUserDetails } from '@/utils/headers';
import { STATUS } from '@/utils/constants';
import { addNewPassword } from '@/controllers/password/add-password';
import { encrypt } from '@/utils/crypto';
import {
	convertPasswordStruct,
	sortPasswordsByDate,
} from '@/controllers/password/convert-password-struct';

export async function GET() {
	try {
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

		const { status, message, passwords } = await getPasswordsListByUsername(
			userDetails?.username
		);

		if (status === STATUS.fail || !passwords) {
			return NextResponse.json(
				{
					message,
				},
				{
					status: 401,
				}
			);
		}

		const convertedPasswords = sortPasswordsByDate(
			convertPasswordStruct(passwords)
		);

		return NextResponse.json({ passwords: convertedPasswords });
	} catch (e) {
		console.error(e);
		return NextResponse.json({ message: 'Unable to fetch data.' });
	}
}

export async function POST(req: Request) {
	try {
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

		const body = await req.json();

		if (!body) {
			return NextResponse.json(
				{
					message: 'Invalid request: No body.',
				},
				{
					status: 400,
				}
			);
		}

		if (!body.app_name || !body.app_name?.trim()) {
			return NextResponse.json(
				{
					field: 'app_name',
					message: 'App Name cannot be empty',
				},
				{
					status: 400,
				}
			);
		}

		if (!body.password || !body.password?.trim()) {
			return NextResponse.json(
				{
					field: 'password',
					message: 'Password cannot be empty',
				},
				{
					status: 400,
				}
			);
		}

		const { status: encryptStatus, iv, encryptedData } = encrypt(body.password);

		if (encryptStatus === STATUS.fail || !encryptedData) {
			return NextResponse.json(
				{
					message: 'Something went wrong. Please try again later.',
				},
				{ status: 400 }
			);
		}

		const { status, message } = await addNewPassword(
			userDetails.username,
			body.app_name,
			body.username,
			encryptedData,
			iv,
			body.email,
			body.phone_number,
			body.additional
		);

		if (status === STATUS.fail) {
			return NextResponse.json(
				{
					message,
				},
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{
				message,
			},
			{ status: 201 }
		);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{
				message: 'Somthing went wrong. Please try again later.',
			},
			{ status: 500 }
		);
	}
}
