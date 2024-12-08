import { Skeleton } from '@/components/ui/skeleton';

export default async function PasswordManagerLoading() {
	return (
		<main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
			<div className="p-2">
				<Skeleton className="w-full h-96" />
			</div>
		</main>
	);
}
