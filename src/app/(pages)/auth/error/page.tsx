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
		<div className="flex min-h-screen items-center justify-center bg-surface-page">
			<div className="w-full max-w-md space-y-8 rounded-lg bg-surface-secondary p-8 shadow-lg border border-border-primary">
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-status-error/10">
						<svg
							className="h-6 w-6 text-status-error"
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
					<h1 className="text-2xl font-bold text-text-primary">Authentication Error</h1>
					<p className="mt-2 text-sm text-text-secondary">{errorMessage}</p>
					{error && <p className="mt-1 text-xs text-text-tertiary">Error code: {error}</p>}
				</div>

				<div className="space-y-4">
					<Link
						href="/login"
						className="flex w-full justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-text-inverse shadow-sm hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
					>
						Try again
					</Link>
					<Link
						href="/"
						className="flex w-full justify-center rounded-md bg-surface-tertiary px-4 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-surface-hover border border-border-primary"
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
				<div className="flex min-h-screen items-center justify-center bg-surface-page">
					<div className="text-text-tertiary">Loading...</div>
				</div>
			}
		>
			<AuthErrorContent />
		</Suspense>
	);
}
