'use client';
import { FC, FormEvent, Fragment, useRef, useState } from 'react';
import { LoaderCircle, Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface IAddPasswordForm {
	onClose: (open: boolean, refetch?: boolean) => void;
}

export const AddPasswordForm: FC<IAddPasswordForm> = ({ onClose }) => {
	const [isPending, setIsPending] = useState(false);
	const [additionalFields, setAdditionalFields] = useState<
		Array<Record<string, string>>
	>([]);
	const [additionalNum, setAdditionalNum] = useState(0);
	const [error, setError] = useState({
		general: '',
		app_name: '',
		password: '',
	});

	const formRef = useRef(null);

	const onAdditionalFieldClick = () => {
		setAdditionalFields((prev) => {
			const key = `additional-field-key-${additionalNum}`;
			const value = `additional-field-value-${additionalNum}`;
			setAdditionalNum((prevNum) => prevNum + 1);
			return [...prev, { [key]: value }];
		});
	};

	const removeAdditional = (key: string, value: string) => {
		setAdditionalFields((prev) =>
			prev.filter((additional) => additional[key] !== value)
		);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		if (formRef.current) {
			try {
				e.preventDefault();
				const formData = new FormData(formRef.current);
				const app_name = formData.get('app_name');
				const username = formData.get('username');
				const email = formData.get('email');
				const password = formData.get('password');
				const phone_number = formData.get('phone_number');

				const additional: Record<string, string> = {};

				formData.forEach((value: FormDataEntryValue, key: string) => {
					if (key.includes('additional-field-key-')) {
						const keyId = key.split('-').pop();
						const inputValue = formData.get(`additional-field-value-${keyId}`);
						additional[value as string] = inputValue as string;
					}
				});

				const body = JSON.stringify({
					username: username as string,
					app_name: app_name as string,
					password: password as string,
					email: email as string,
					phone_number: phone_number as string,
					additional,
				});

				setIsPending(true);
				const res = await fetch('/api/passwords', {
					method: 'POST',
					body,
				});

				const status = res.status;
				const response = await res.json();

				if (status !== 201) {
					const key: keyof typeof error = response?.field ?? 'general';
					setError((prev) => ({ ...prev, [key]: response?.message }));
					return;
				}

				onClose(false, true); // refetch data table
				toast('New Password created.');
			} catch (e) {
				console.log({ e });
			} finally {
				setIsPending(false);
			}
		}
	};

	return (
		<form ref={formRef} onSubmit={onSubmit}>
			<div className="grid gap-4 py-4 max-h-96 overflow-auto px-1">
				{error?.general ? (
					<p className="text-red-500">{error.general}</p>
				) : (
					<></>
				)}
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="app_name"
						className={`text-right ${error?.app_name ? 'text-red-500' : ''}`}
					>
						App Name
					</Label>
					<Input
						id="app_name"
						name="app_name"
						defaultValue=""
						className="col-span-3"
					/>
					{error?.app_name && (
						<>
							<div className="" />
							<p className="col-span-3 text-sm text-red-500 m-0">
								{error?.app_name}
							</p>
						</>
					)}
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right">
						Username
					</Label>
					<Input
						id="username"
						name="username"
						autoComplete="username"
						defaultValue=""
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="email" className="text-right">
						Email
					</Label>
					<Input
						id="email"
						autoComplete="email"
						name="email"
						defaultValue=""
						className="col-span-3"
					/>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label
						htmlFor="password"
						className={`text-right ${error?.password ? 'text-red-500' : ''}`}
					>
						Password
					</Label>
					<Input
						id="password"
						type="password"
						name="password"
						autoComplete="current-password"
						defaultValue=""
						className="col-span-3"
					/>
					{error?.password && (
						<>
							<div className="" />
							<p className="col-span-3 text-sm text-red-500 m-0">
								{error?.password}
							</p>
						</>
					)}
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="phone_number" className="text-right">
						Phone Number
					</Label>
					<Input
						id="phone_number"
						name="phone_number"
						autoComplete="tel"
						defaultValue=""
						className="col-span-3"
					/>
				</div>
				{additionalFields?.length > 0 ? (
					<>
						<Separator />
						<h4 className="font-bold">Additional Fields</h4>
					</>
				) : (
					''
				)}
				{additionalFields.map((additional, index) => (
					<div
						key={`additional-field-${index}`}
						className="grid grid-cols-4 items-center gap-4"
					>
						{Object.entries(additional).map(([key, value]) => (
							<Fragment key={key + value}>
								<div className="col-span-1 flex items-center">
									<Input
										autoComplete="off"
										id={key}
										name={key}
										defaultValue=""
									/>
								</div>
								<div className="col-span-2">
									<Input
										autoComplete="off"
										id={value}
										name={value}
										defaultValue=""
									/>
								</div>
								<Button
									type="button"
									variant="ghost"
									className="col-span-1"
									onClick={() => removeAdditional(key, value)}
								>
									<X />
								</Button>
							</Fragment>
						))}
					</div>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={onAdditionalFieldClick}
				>
					<Plus />
					Add Additional Fields
				</Button>
			</div>
			<div className="flex justify-end pt-4">
				<Button type="submit" disabled={isPending}>
					{isPending ? (
						<LoaderCircle className="animate-spin" />
					) : (
						<>
							<Save /> Save
						</>
					)}
				</Button>
			</div>
		</form>
	);
};
