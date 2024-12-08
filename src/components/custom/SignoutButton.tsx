'use client';
import { useRouter } from 'next/navigation';
import { LoaderCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';

export function SignoutButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const onLogout = async () => {
		try {
			setIsLoading(true);
			await fetch('/api/auth/logout', { method: 'POST' });
			setIsLoading(false);
			router.push('/login');
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		}
	};

	return (
		<Button variant="ghost" className="w-full" onClick={onLogout}>
			{isLoading ? (
				<LoaderCircle className="animate-spin" />
			) : (
				<>
					<LogOut />
					Sign Out
				</>
			)}
		</Button>
	);
}
