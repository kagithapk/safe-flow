export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
			<div className="hidden md:block"></div>
			<div className="flex justify-center items-center">{children}</div>
		</div>
	);
}
