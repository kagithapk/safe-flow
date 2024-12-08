'use client';
import { useActionState } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/controllers/auth/login';
import { LoaderCircle, LogIn } from 'lucide-react';

export default function Login() {
	const [state, action, isPending] = useActionState(login, undefined);

	return (
		<Card className="w-[350px] h-fit">
			<form action={action}>
				<CardHeader>
					<CardTitle>Login</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						{state?.errors?.general && (
							<p className="text-sm text-red-500 m-0">{state.errors.general}</p>
						)}
						<div className="flex flex-col space-y-1.5">
							<Label
								htmlFor="email"
								className={state?.errors?.email ? 'text-red-500' : ''}
							>
								Email
							</Label>
							<Input
								id="email"
								name="email"
								placeholder="Email"
								autoComplete="email"
								defaultValue={state?.data?.email}
							/>
						</div>
						{state?.errors?.email && (
							<p className="text-sm text-red-500 m-0">{state.errors.email}</p>
						)}
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								placeholder="Password"
								type="password"
								name="password"
								defaultValue={state?.data?.password}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col">
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? <LoaderCircle className="animate-spin" /> : <LogIn />}
						{isPending ? '' : 'Login'}
					</Button>
					<p className="mt-4">
						Don&apos;t have an account? <Link href="/signup">Signup here</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	);
}
