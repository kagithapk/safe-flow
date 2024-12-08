import Link from 'next/link';
import { FC } from 'react';
import { LoaderCircle, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
	Card,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ISignup } from '@/controllers/auth/signup.types';

interface IRegistrationForm {
	state: ISignup;
	action: (payload: FormData) => void;
	isPending: boolean;
}

export const RegistrationForm: FC<IRegistrationForm> = ({
	state,
	action,
	isPending,
}) => {
	return (
		<Card className="w-[350px] h-fit">
			<form action={action}>
				<CardHeader>
					<CardTitle>Sign up</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						{state?.errors?.general && (
							<p className="text-sm text-red-500 m-0">{state.errors.general}</p>
						)}
						<div className="flex flex-col space-y-1.5">
							<Label
								htmlFor="first_name"
								className={state?.errors?.first_name ? 'text-red-500' : ''}
							>
								First Name
							</Label>
							<Input
								id="first_name"
								name="first_name"
								placeholder="First Name"
								autoComplete="first_name"
								className={state?.errors?.first_name ? 'text-red-500' : ''}
								defaultValue={state?.data?.first_name}
							/>
						</div>
						{state?.errors?.first_name && (
							<p className="text-sm text-red-500 m-0">
								{state.errors.first_name}
							</p>
						)}
						<div className="flex flex-col space-y-1.5">
							<Label
								htmlFor="last_name"
								className={state?.errors?.last_name ? 'text-red-500' : ''}
							>
								Last Name
							</Label>
							<Input
								id="last_name"
								name="last_name"
								placeholder="Last Name"
								autoComplete="last_name"
								className={state?.errors?.last_name ? 'text-red-500' : ''}
								defaultValue={state?.data?.last_name}
							/>
						</div>
						{state?.errors?.last_name && (
							<p className="text-sm text-red-500 m-0">
								{state.errors.last_name}
							</p>
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
								className={state?.errors?.email ? 'border-red-500' : ''}
								defaultValue={state?.data?.email}
							/>
						</div>
						{state?.errors?.email && (
							<p className="text-sm text-red-500 m-0">{state.errors.email}</p>
						)}
						<div className="flex flex-col space-y-1.5">
							<Label
								htmlFor="password"
								className={state?.errors?.password ? 'text-red-500' : ''}
							>
								Password
							</Label>
							<Input
								id="password"
								placeholder="Password"
								type="password"
								name="password"
								className={state?.errors?.password ? 'text-red-500' : ''}
								defaultValue={state?.data?.password}
							/>
						</div>
						{state?.errors?.password && (
							<p className="text-sm text-red-500 m-0">
								{state.errors.password}
							</p>
						)}
						<div className="flex flex-col space-y-1.5">
							<Label
								htmlFor="app_code"
								className={state?.errors?.app_code ? 'text-red-500' : ''}
							>
								App Code
							</Label>
							<Input
								id="app_code"
								placeholder="App Code"
								name="app_code"
								className={state?.errors?.app_code ? 'text-red-500' : ''}
								defaultValue={state?.data?.app_code}
							/>
						</div>
						{state?.errors?.app_code && (
							<p className="text-sm text-red-500 m-0">
								{state.errors.app_code}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter className="flex flex-col">
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? <LoaderCircle className="animate-spin" /> : <LogIn />}
						{isPending ? '' : 'Sign up'}
					</Button>
					<p className="mt-4">
						Have an account? <Link href="/login">Login here</Link>
					</p>
				</CardFooter>
			</form>
		</Card>
	);
};
