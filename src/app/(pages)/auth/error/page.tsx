'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const errorMessages: Record<string, string> = {
	Configuration: 'There is a problem with the server configuration.',
	AccessDenied: 'You do not have permission to sign in.',
	Verification: 'The verification token has expired or has already been used.',
	OAuthSignin: 'Error in constructing an authorization URL.',
	OAuthCallback: 'Error in handling the response from the OAuth provider.',
	OAuthCreateAccount: 'Could not create OAuth provider user in the database.',
	EmailCreateAccount: 'Could not create email provider user in the database.',
	Callback: 'Error in the OAuth callback handler.',
	OAuthAccountNotLinked:
		'This email is already associated with another account. Sign in with the original provider.',
	EmailSignin: 'The email could not be sent.',
	CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
	SessionRequired: 'Please sign in to access this page.',
	Default: 'An unexpected error occurred.',
};

function AuthErrorContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get('error') || 'Default';
	const errorMessage = errorMessages[error] || errorMessages.Default;

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
						<svg
							className="h-6 w-6 text-red-600 dark:text-red-400"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							/>
						</svg>
					</div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication Error</h1>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{errorMessage}</p>
					{error && (
						<p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Error code: {error}</p>
					)}
				</div>

				<div className="space-y-4">
					<Link
						href="/login"
						className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						Try again
					</Link>
					<Link
						href="/"
						className="flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
					>
						Go to homepage
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function AuthErrorPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center">
					<div className="text-gray-500">Loading...</div>
				</div>
			}
		>
			<AuthErrorContent />
		</Suspense>
	);
}
