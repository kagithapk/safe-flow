'use client';
import { FC, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { AddPasswordForm } from './AddPasswordForm';

interface IAddPassword {
	onClose: (refetch?: boolean) => void;
}

export const AddPassword: FC<IAddPassword> = ({ onClose }) => {
	const [open, setOpen] = useState(false);

	const onCloseModal = (value: boolean, refetch?: boolean) => {
		setOpen(value);

		if (refetch) {
			onClose(true);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Add new
				</Button>
			</DialogTrigger>
			<DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Save a new password</DialogTitle>
				</DialogHeader>
				<AddPasswordForm onClose={onCloseModal} />
			</DialogContent>
		</Dialog>
	);
};
