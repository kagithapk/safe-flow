import Link from 'next/link';
import { MoveRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export const RegistrationSuccess = () => {
	return (
		<Card className="w-[350px] h-fit">
			<CardHeader>
				<CardTitle>Sign up successful</CardTitle>
			</CardHeader>
			<CardContent>
				Account has been successfully created. Our team will review the account
				and enable it shortly. Thank you for the patience.
			</CardContent>
			<CardFooter>
				<Button className="w-full">
					<MoveRight size={36} />
					<Link href="/login">Go to Login</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
