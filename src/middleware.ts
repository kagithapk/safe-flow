import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateToken } from './lib/jose';
import { STATUS } from './utils/constants';
import { getStringifyUserPayload, IUserPaylaod } from './utils/user-payload';

// open routes for UI and API endpoints (doesn't require token)
const openPageRoutes: Array<string> = [];
const openApiRoutes = ['/api/seed'];
const loginPageRoutes = ['/login', '/signup'];
const openResource = ['/_next', '/favicon'];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const cookieStore = await cookies();

	// Get the auth token from cookies
	const token = cookieStore.get('token');

	const isProtectedPage = ![
		...openPageRoutes,
		...loginPageRoutes,
		...openApiRoutes,
		...openResource,
	].some((route) => pathname.startsWith(route));

	// Check if the request is for a protected page
	if (isProtectedPage) {
		if (!token) {
			// check if it is api
			if (pathname.startsWith('/api')) {
				return NextResponse.json(
					{ message: 'Your token has expired.' },
					{ status: 401 }
				);
			}
			const loginUrl = new URL('/login', request.url);
			return NextResponse.redirect(loginUrl);
		}

		const { status, data } = await validateToken(token?.value);

		if (status === STATUS.fail) {
			cookieStore.delete('token');
			const loginUrl = new URL('/login', request.url);
			return NextResponse.redirect(loginUrl);
		}

		const userHeaders = new Headers(request.headers);
		// Add a new header
		userHeaders.set(
			'x-user',
			getStringifyUserPayload(data?.payload as IUserPaylaod)
		);
		// And produce a response with the new headers
		return NextResponse.next({ request: { headers: userHeaders } });
	}

	// Check if the request is for a open frontend page
	if (openPageRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Check if the request is for a open API route
	if (openApiRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Check if the request is for a open resources
	if (openResource.some((route) => pathname.startsWith(route))) {
		return NextResponse.next();
	}

	// Check if the request is for a login/signup page
	if (loginPageRoutes.some((route) => pathname.startsWith(route))) {
		if (token) {
			const { status, data } = await validateToken(token?.value);

			if (status === STATUS.success && data) {
				const homeUrl = new URL('/', request.url);
				return NextResponse.redirect(homeUrl);
			}
		}
	}

	return NextResponse.next();
}
