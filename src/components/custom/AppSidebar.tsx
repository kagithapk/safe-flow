import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ChevronsUpDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SignoutButton } from './SignoutButton';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { IUserPaylaod } from '@/utils/user-payload';
import { IUser } from '@/models/user';

interface IAppSidebar {
	username: IUserPaylaod['username'];
	firstName: IUser['first_name'];
	lastName: IUser['last_name'];
}

export function AppSidebar({ username, firstName, lastName }: IAppSidebar) {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="h-13 py-2 mb-1">
									<Avatar>
										{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
										<AvatarFallback>
											{username?.slice(0, 1)?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<p className="font-bold">{username}</p>
										<p>
											{firstName} {lastName}
										</p>
									</div>
									<ChevronsUpDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="right"
								className="w-[--radix-popper-anchor-width]"
							>
								<div className="flex items-center p-2">
									<Avatar className="mr-2">
										{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
										<AvatarFallback>
											{username?.slice(0, 1)?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<p className="font-bold">{username}</p>
										<p>
											{firstName} {lastName}
										</p>
									</div>
								</div>
								<DropdownMenuSeparator />
								<SignoutButton />
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
