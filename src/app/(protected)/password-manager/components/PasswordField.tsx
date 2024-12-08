import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface IPasswordField {
	value?: string;
	id?: string;
}

export const PasswordField: FC<IPasswordField> = ({ value, id }) => {
	const [showValue, setShowValue] = useState(false);
	const [actualValue, setActualValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const maskedValue = value
		?.split('')
		?.map(() => '*')
		.concat('');

	const toggleShowValue = async () => {
		if (!showValue && !actualValue) {
			try {
				setIsLoading(true);
				const res = await fetch(
					`/api/passwords/${id}/decrypt-value?encrypted-value=${value}`,
					{
						method: 'GET',
					}
				);
				const response = await res.json();
				if (res.status === 200) {
					setActualValue(response?.decrypted);
				} else {
					if (response?.message) {
						toast(response?.message);
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		}
		setShowValue((prev) => !prev);
	};

	const copyToClipboard = async () => {
		if (!actualValue) {
			try {
				setIsLoading(true);
				const res = await fetch(
					`/api/passwords/${id}/decrypt-value?encrypted-value=${value}`,
					{
						method: 'GET',
					}
				);
				const response = await res.json();
				if (res.status === 200) {
					setActualValue(response?.decrypted);
					navigator.clipboard.writeText(actualValue);
					toast('Copied to clipboard');
				} else {
					if (response?.message) {
						toast(response?.message);
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		} else {
			navigator.clipboard.writeText(actualValue);
			toast('Copied to clipboard');
		}
	};

	return (
		<div className="font-medium items-center grid grid-cols-2">
			<p className="overflow-scroll">{showValue ? actualValue : maskedValue}</p>
			<div className="ml-2 flex">
				<Button size="sm" variant="ghost" onClick={toggleShowValue}>
					{isLoading ? (
						<LoaderCircle className="animate-spin" />
					) : showValue ? (
						<Eye />
					) : (
						<EyeOff />
					)}
				</Button>
				<Button size="sm" variant="ghost" onClick={copyToClipboard}>
					{isLoading ? <LoaderCircle className="animate-spin" /> : <Copy />}
				</Button>
			</div>
		</div>
	);
};
