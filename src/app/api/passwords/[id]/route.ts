import { deletePassword } from '@/controllers/password/delete-password';
import { editPassword } from '@/controllers/password/edit-password';
import { STATUS } from '@/utils/constants';
import { encrypt } from '@/utils/crypto';
import { getUserDetails } from '@/utils/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{
					message: 'Invalid Id.',
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

		const { status, message } = await editPassword(
			userDetails.username,
			id,
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
			{ status: 200 }
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

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{
					message: 'Invalid Id.',
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

		const { status, message } = await deletePassword(userDetails.username, id);

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
