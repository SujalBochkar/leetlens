'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { QueryProvider } from './query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<QueryProvider>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					{children}
				</ThemeProvider>
			</QueryProvider>
		</SessionProvider>
	);
}
