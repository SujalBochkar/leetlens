import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Apple from 'next-auth/providers/apple';

/**
 * Edge-compatible auth config (no Prisma adapter)
 * Used by middleware for route protection
 */
export const authConfig = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		Apple({
			clientId: process.env.APPLE_CLIENT_ID!,
			clientSecret: process.env.APPLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
		error: '/auth/error',
	},
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
			}
			return token;
		},
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const pathname = nextUrl.pathname;

			// Protected routes
			const protectedRoutes = ['/dashboard', '/profile'];
			const isProtectedRoute = protectedRoutes.some(
				(route) => pathname === route || pathname.startsWith(`${route}/`),
			);

			if (isProtectedRoute && !isLoggedIn) {
				return false; // Redirect to signIn page
			}

			// Redirect logged-in users away from login page
			if (isLoggedIn && (pathname === '/login' || pathname === '/signup')) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}

			return true;
		},
	},
} satisfies NextAuthConfig;
