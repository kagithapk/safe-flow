import { redirect } from 'next/navigation';
import { AppCard } from './components/AppCard';
import { getUserDetails } from '@/utils/headers';
import { getUserAppsByUsername } from '@/controllers/user/get-user-details';
import { STATUS } from '@/utils/constants';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SignoutButton } from '@/components/custom/SignoutButton';

export default async function Home() {
	const { status: userStatus, user } = await getUserDetails();

	if (userStatus === STATUS.fail || !user?.username) {
		redirect('/login');
	}

	const { status, message, apps } = await getUserAppsByUsername(user.username);

	if (status === STATUS.fail) {
		return (
			<div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
				<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
					<div className="flex h-14 items-center px-4">
						<div className="flex flex-1 items-center justify-between gap-2">
							<div className="w-1 h-1" />
							<div className=" md:w-auto md:flex-none">icon place</div>
						</div>
					</div>
				</header>
				<main className="flex flex-col row-start-2 items-center sm:items-start">
					<p>{message}</p>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
			<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
				<div className="flex h-14 items-center px-4">
					<div className="flex flex-1 items-center justify-between gap-2">
						<div>
							<p className="text-lg text-blue-500 font-bold">Safe Flow</p>
						</div>
						<div className=" md:w-auto md:flex-none">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className="cursor-pointer">
										{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
										<AvatarFallback>
											{user?.username?.slice(0, 1)?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="bottom"
									className="w-[--radix-popper-anchor-width]"
								>
									<SignoutButton />
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</header>
			<main className="p-2 flex flex-col row-start-2 items-center sm:items-start">
				{apps.map(({ name, path }) => (
					<AppCard key={name} name={name} path={path} />
				))}
			</main>
		</div>
	);
}
