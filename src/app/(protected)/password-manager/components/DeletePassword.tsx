import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { IPasswordConvert } from '@/models/password';
import { LoaderCircle } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface IDeletePassword {
	open: boolean;
	onOpenChange: (open: boolean, refresh?: boolean) => void;
	selected: IPasswordConvert | null;
}

export const DeletePassword: FC<IDeletePassword> = ({
	open,
	onOpenChange,
	selected,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	if (!selected) {
		return <></>;
	}

	const onDelete = async () => {
		try {
			setIsLoading(true);
			const res = await fetch(`/api/passwords/${selected?.id}`, {
				method: 'DELETE',
			});
			const response = await res.json();
			if (res.status !== 200) {
				toast(response?.message ?? 'Something went wrong.');
			}
			onOpenChange(false, true); // reload data table
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete password</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Are you sure, you want to delete the password?
				</DialogDescription>
				<DialogFooter>
					<Button variant="destructive" onClick={onDelete} disabled={isLoading}>
						{isLoading ? <LoaderCircle className="animate-spin" /> : 'Yes'}
					</Button>
					<Button variant="ghost" onClick={() => onOpenChange(false)}>
						No
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
