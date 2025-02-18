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
			<DialogContent
				aria-describedby={undefined}
				className="max-w-xs sm:max-w-[425px] overflow-auto [@media(max-height:425px)]:max-h-36 sm:max-h-screen"
			>
				<DialogHeader>
					<DialogTitle>View password</DialogTitle>
				</DialogHeader>
				<Separator />
				{selected ? (
					<div className="grid gap-4">
						<div className="grid grid-cols-2">
							<p className="font-bold">App name</p>
							<p className=" overflow-auto">{selected.app_name}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Username</p>
							<p className=" overflow-auto">{selected.username}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Email</p>
							<p className=" overflow-auto">{selected.email}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Phone Number</p>
							<p className=" overflow-auto">{selected.phone_number}</p>
						</div>
						<div className="grid grid-cols-2">
							<p className="font-bold">Password</p>
							<PasswordField value={selected.password} id={selected.id} />
						</div>
						{selected?.additional &&
						Object.entries(JSON.parse(selected.additional))?.length > 0 ? (
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
					<Button
						className="mt-2 sm:mt-0"
						variant="secondary"
						onClick={() => onEdit(selected)}
					>
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
