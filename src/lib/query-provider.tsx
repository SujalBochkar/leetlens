'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
	// Create QueryClient with optimized defaults
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Data is fresh for 5 minutes
						staleTime: 5 * 60 * 1000,
						// Keep unused data in cache for 30 minutes
						gcTime: 30 * 60 * 1000,
						// Retry failed requests 2 times
						retry: 2,
						// Don't refetch on window focus in development
						refetchOnWindowFocus: process.env.NODE_ENV === 'production',
						// Don't refetch on reconnect
						refetchOnReconnect: false,
					},
				},
			}),
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
