'use client';

import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, RefreshCcw } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { IPasswordConvert } from '@/models/password';
import { ViewPassword } from '../ViewPassword';
import { EditdPassword } from '../EditPassword';
import { DeletePassword } from '../DeletePassword';
import { useColumns } from './useColumns';
import { toast } from 'sonner';
import { AddPassword } from '../AddPassword';

interface IPasswordTable {
	passwords: Array<IPasswordConvert>;
}

export function PasswordTable({ passwords }: IPasswordTable) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [isViewOpen, setIsViewOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [selectedView, setSelectedView] = useState<IPasswordConvert | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);

	const [data, setData] = useState<Array<IPasswordConvert>>(() => passwords);

	const onRefresh = async () => {
		try {
			setIsLoading(true);
			const res = await fetch('/api/passwords');
			const response = await res.json();

			if (res.status !== 200) {
				toast(
					response?.message ?? 'Something went wrong. Please try again later.'
				);
			}

			setData(response?.passwords);
		} catch (e) {
			console.error(e);
			toast('Something went wrong. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};

	const onAddClose = (refetch?: boolean) => {
		if (refetch) {
			onRefresh();
		}
	};

	const onView = useCallback((selected: IPasswordConvert) => {
		setIsViewOpen(true);
		setIsEditOpen(false);
		setIsDeleteOpen(false);
		setSelectedView(selected);
	}, []);

	const onEdit = useCallback((selected: IPasswordConvert) => {
		setIsViewOpen(false);
		setIsEditOpen(true);
		setIsDeleteOpen(false);
		setSelectedView(selected);
	}, []);

	const onDelete = useCallback((selected: IPasswordConvert) => {
		setIsViewOpen(false);
		setIsEditOpen(false);
		setIsDeleteOpen(true);
		setSelectedView(selected);
	}, []);

	const onViewClose = (open: boolean) => {
		setIsViewOpen(open);
		setSelectedView(null);
	};

	const onEditClose = (open: boolean, refresh?: boolean) => {
		setIsEditOpen(open);
		setSelectedView(null);

		if (refresh) {
			onRefresh();
		}
	};

	const onDeleteClose = (open: boolean, refresh?: boolean) => {
		setIsDeleteOpen(open);
		setSelectedView(null);

		if (refresh) {
			onRefresh();
		}
	};

	const columns = useColumns(onView, onEdit, onDelete);

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<>
			<div className="flex justify-between items-center py-2">
				<div>
					<p className="text-2xl font-bold">Passwords</p>
				</div>
				<AddPassword onClose={onAddClose} />
			</div>
			<div className="w-full">
				<div className="flex items-center justify-between py-4">
					<Input
						placeholder="Filter App Name..."
						name="filter_passwords"
						value={
							(table.getColumn('app_name')?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table.getColumn('app_name')?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<div className="flex items-center">
						<Button
							variant="outline"
							className="mr-2"
							disabled={isLoading}
							onClick={onRefresh}
						>
							<RefreshCcw className={isLoading ? 'animate-spin' : ''} /> Refresh
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="ml-auto">
									Columns <ChevronDown />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem
												key={column.id}
												className="capitalize"
												checked={column.getIsVisible()}
												onCheckedChange={(value) =>
													column.toggleVisibility(!!value)
												}
											>
												{column.id}
											</DropdownMenuCheckboxItem>
										);
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="rounded-md border">
					<Table className="h-screen-other-than-table">
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
			<ViewPassword
				open={isViewOpen}
				onOpenChange={onViewClose}
				selected={selectedView}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
			<EditdPassword
				open={isEditOpen}
				setOpen={onEditClose}
				selected={selectedView}
			/>
			<DeletePassword
				open={isDeleteOpen}
				onOpenChange={onDeleteClose}
				selected={selectedView}
			/>
		</>
	);
}
