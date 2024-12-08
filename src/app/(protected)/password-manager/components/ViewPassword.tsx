import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { IPasswordConvert } from '@/models/password';
import { Pencil, Trash } from 'lucide-react';
import { FC } from 'react';
import { PasswordField } from './PasswordField';
import { Separator } from '@/components/ui/separator';

interface IViewPassword {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selected: IPasswordConvert | null;
	onEdit: (selected: IPasswordConvert) => void;
	onDelete: (selected: IPasswordConvert) => void;
}
export const ViewPassword: FC<IViewPassword> = ({
	open,
	onOpenChange,
	selected,
	onEdit,
	onDelete,
}) => {
	if (!selected) {
		return <></>;
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit password</DialogTitle>
				</DialogHeader>
				<Separator />
				{selected ? (
					<div className="grid gap-4">
						<div className="grid grid-cols-2">
							<p className="font-bold">App name</p>
							<p>{selected.app_name}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Username</p>
							<p>{selected.username}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Email</p>
							<p>{selected.email}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Phone Number</p>
							<p>{selected.phone_number}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Password</p>
							<PasswordField value={selected.password} id={selected.id} />
						</div>
						{selected?.additional ? (
							<>
								<Separator />
								<h3 className="font-bold italic">Additional</h3>
								{Object.entries(JSON.parse(selected.additional)).map(
									([key, value]) => (
										<div key={key + value} className="grid grid-cols-2">
											<p className="font-bold">{key}</p>
											<p>{value as string}</p>
										</div>
									)
								)}
							</>
						) : (
							<></>
						)}
					</div>
				) : (
					<></>
				)}
				<Separator />
				<DialogFooter>
					<Button variant="secondary" onClick={() => onEdit(selected)}>
						<Pencil />
						Edit
					</Button>
					<Button variant="destructive" onClick={() => onDelete(selected)}>
						<Trash />
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
