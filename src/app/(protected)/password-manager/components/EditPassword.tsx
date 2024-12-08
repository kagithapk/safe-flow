'use client';

import { FC } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { EditPasswordForm } from './EditPasswordForm';
import { IPasswordConvert } from '@/models/password';

interface IEditPassword {
	open: boolean;
	setOpen: (open: boolean, refresh?: boolean) => void;
	selected: IPasswordConvert | null;
}

export const EditdPassword: FC<IEditPassword> = ({
	open,
	setOpen,
	selected,
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit password</DialogTitle>
				</DialogHeader>
				<EditPasswordForm setOpen={setOpen} selected={selected} />
			</DialogContent>
		</Dialog>
	);
};
