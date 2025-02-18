'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
	ArrowUpDown,
	Copy,
	Eye,
	LoaderCircle,
	MoreHorizontal,
	Pencil,
	Trash,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IPasswordConvert } from '@/models/password';

import { PasswordField } from '../PasswordField';

export const useColumns: (
	onView: (selected: IPasswordConvert) => void,
	onEdit: (selected: IPasswordConvert) => void,
	onDelete: (selected: IPasswordConvert) => void
) => ColumnDef<IPasswordConvert>[] = (onView, onEdit, onDelete) => [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'username',
		header: 'Username',
		cell: ({ row }) => <div>{row.getValue('username')}</div>,
	},
	{
		accessorKey: 'app_name',
		header: 'App Name',
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue('app_name')}</div>
		),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'password',
		header: () => 'Password',
		cell: ({ row }) => (
			<PasswordField value={row.getValue('password')} id={row.original.id} />
		),
	},
	{
		accessorKey: 'phone_number',
		header: 'Phone Number',
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue('phone_number')}</div>
		),
	},
	{
		accessorKey: 'updated_at',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Updated At
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue('updated_at')}</div>
		),
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: function Cell({ row }) {
			const rowData = row.original;
			const [actualPassword, setActualPassword] = useState('');
			const [isLoading, setIsLoading] = useState(false);

			const onCopy = async () => {
				if (!isLoading) {
					let dataToCopy = '';
					dataToCopy += `App Name: ${row.original.app_name}\n`;
					dataToCopy += row.original.username
						? `Username: ${row.original.username}\n`
						: '';
					dataToCopy += row.original.email
						? `Email: ${row.original.email}\n`
						: '';
					dataToCopy += row.original.phone_number
						? `Phone Number: ${row.original.phone_number}\n`
						: '';

					let p = actualPassword;

					if (!actualPassword) {
						try {
							setIsLoading(true);
							const res = await fetch(
								`/api/passwords/${row.original.id}/decrypt-value?encrypted-value=${row.original.password}`,
								{
									method: 'GET',
								}
							);
							const response = await res.json();
							if (res.status === 200) {
								p = response?.decrypted;
								setActualPassword(response?.decrypted);
							}
						} catch (e) {
							console.error(e);
						} finally {
							setIsLoading(false);
						}
					}

					dataToCopy += `Password: ${p}`;

					navigator.clipboard.writeText(dataToCopy);
					toast('Copied successfully');
				}
			};

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={onCopy} disabled={isLoading}>
							{isLoading ? (
								<LoaderCircle className="animate-spin" />
							) : (
								<>
									<Copy />
									Copy
								</>
							)}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onView(rowData)}>
							<Eye />
							View
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onEdit(rowData)}>
							<Pencil />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							className="text-red-500"
							onClick={() => onDelete(rowData)}
						>
							<Trash />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
