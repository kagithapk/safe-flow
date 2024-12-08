import { getUserDetails } from '@/utils/headers';
import { STATUS } from '@/utils/constants';
import { redirect } from 'next/navigation';
import { PasswordTable } from './components/PasswordTable';
import { getPasswordsListByUsername } from '@/controllers/password/get-passwords';
import { IPasswordConvert } from '@/models/password';
import { Toaster } from '@/components/ui/sonner';
import {
	convertPasswordStruct,
	sortPasswordsByDate,
} from '@/controllers/password/convert-password-struct';

export default async function PasswordManagerHome() {
	const { status: userStatus, user } = await getUserDetails();

	if (userStatus === STATUS.fail || !user?.username) {
		redirect('/login');
	}

	const { status, message, passwords } = await getPasswordsListByUsername(
		user.username
	);

	if (status === STATUS.fail || !passwords) {
		return (
			<main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
				<div className="p-2">
					<p>{message}</p>
				</div>
			</main>
		);
	}

	const convertedPasswords: Array<IPasswordConvert> = sortPasswordsByDate(
		convertPasswordStruct(passwords)
	);

	return (
		<main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
			<div className="px-4 py-2">
				<PasswordTable passwords={convertedPasswords} />
				<Toaster />
			</div>
		</main>
	);
}
