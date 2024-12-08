import { AppSidebar } from '@/components/custom/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUserDetailsByUsername } from '@/controllers/user/get-user-details';
import { STATUS } from '@/utils/constants';
import { getUserDetails } from '@/utils/headers';
import { redirect } from 'next/navigation';

export default async function PasswordManagerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { status: userStatus, user: userDetails } = await getUserDetails();

	if (userStatus === STATUS.fail || !userDetails?.username) {
		redirect('/login');
	}

	const { user } = await getUserDetailsByUsername(userDetails.username);

	if (!user) {
		redirect('/login');
	}

	return (
		<SidebarProvider>
			<AppSidebar
				username={user.username}
				firstName={user.first_name}
				lastName={user.last_name}
			/>
			<section className="w-screen">
				<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
					<div className="flex h-14 items-center px-4">
						<div className="flex flex-1 items-center justify-between gap-2 md:justify-start">
							<div className="w-full flex-1 md:w-auto md:flex-none">
								<SidebarTrigger />
							</div>
							<nav className="flex items-center gap-0.5"></nav>
						</div>
					</div>
				</header>
				{children}
			</section>
		</SidebarProvider>
	);
}
