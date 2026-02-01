import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// ============================================
// Query Keys - Centralized for cache invalidation
// ============================================
export const queryKeys = {
	// LeetCode
	leetcode: {
		all: ['leetcode'] as const,
		problems: (params?: { page?: number; limit?: number; difficulty?: string; topic?: string }) =>
			[...queryKeys.leetcode.all, 'problems', params] as const,
		problem: (id: string) => [...queryKeys.leetcode.all, 'problem', id] as const,
		companies: () => [...queryKeys.leetcode.all, 'companies'] as const,
		companyProblems: (slug: string, params?: Record<string, unknown>) =>
			[...queryKeys.leetcode.all, 'company', slug, params] as const,
		topics: () => [...queryKeys.leetcode.all, 'topics'] as const,
		stats: () => [...queryKeys.leetcode.all, 'stats'] as const,
	},
};

// ============================================
// API Functions
// ============================================
const api = {
	leetcode: {
		getProblems: async (params?: {
			page?: number;
			limit?: number;
			difficulty?: string;
			topic?: string;
		}) => {
			const { data } = await axios.get('/api/leetcode/problems', { params });
			return data;
		},

		getCompanies: async () => {
			const { data } = await axios.get('/api/leetcode/companies');
			return data;
		},

		getCompanyProblems: async (
			slug: string,
			params?: {
				page?: number;
				limit?: number;
				difficulty?: string;
				sortBy?: string;
				sortOrder?: string;
			},
		) => {
			const { data } = await axios.get(`/api/leetcode/companies/${slug}/problems`, { params });
			return data;
		},

		getTopics: async () => {
			const { data } = await axios.get('/api/leetcode/topics');
			return data;
		},

		getStats: async () => {
			const { data } = await axios.get('/api/leetcode/stats');
			return data;
		},
	},
};

// ============================================
// Custom Hooks with Caching
// ============================================

/**
 * Fetch LeetCode problems with pagination and filters
 * Cache: 5 minutes stale time
 */
export function useLeetCodeProblems(params?: {
	page?: number;
	limit?: number;
	difficulty?: string;
	topic?: string;
}) {
	return useQuery({
		queryKey: queryKeys.leetcode.problems(params),
		queryFn: () => api.leetcode.getProblems(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
		placeholderData: (previousData) => previousData, // Keep previous data while loading new page
	});
}

/**
 * Fetch all companies
 * Cache: 30 minutes (companies don't change often)
 */
export function useLeetCodeCompanies() {
	return useQuery({
		queryKey: queryKeys.leetcode.companies(),
		queryFn: api.leetcode.getCompanies,
		staleTime: 30 * 60 * 1000, // 30 minutes
		gcTime: 60 * 60 * 1000, // Keep in cache for 1 hour
	});
}

/**
 * Fetch problems for a specific company
 * Cache: 10 minutes
 */
export function useCompanyProblems(
	slug: string,
	params?: {
		page?: number;
		limit?: number;
		difficulty?: string;
		sortBy?: string;
		sortOrder?: string;
	},
) {
	return useQuery({
		queryKey: queryKeys.leetcode.companyProblems(slug, params),
		queryFn: () => api.leetcode.getCompanyProblems(slug, params),
		staleTime: 10 * 60 * 1000, // 10 minutes
		enabled: !!slug, // Only fetch when slug is available
		placeholderData: (previousData) => previousData,
	});
}

/**
 * Fetch all topics
 * Cache: 1 hour (topics rarely change)
 */
export function useLeetCodeTopics() {
	return useQuery({
		queryKey: queryKeys.leetcode.topics(),
		queryFn: api.leetcode.getTopics,
		staleTime: 60 * 60 * 1000, // 1 hour
		gcTime: 2 * 60 * 60 * 1000, // 2 hours
	});
}

/**
 * Fetch overall stats
 * Cache: 15 minutes
 */
export function useLeetCodeStats() {
	return useQuery({
		queryKey: queryKeys.leetcode.stats(),
		queryFn: api.leetcode.getStats,
		staleTime: 15 * 60 * 1000, // 15 minutes
	});
}

// ============================================
// Prefetch Functions (for SSR or anticipatory loading)
// ============================================

/**
 * Prefetch companies data (useful for navigation anticipation)
 */
export function usePrefetchCompanies() {
	const queryClient = useQueryClient();

	return () => {
		queryClient.prefetchQuery({
			queryKey: queryKeys.leetcode.companies(),
			queryFn: api.leetcode.getCompanies,
			staleTime: 30 * 60 * 1000,
		});
	};
}

/**
 * Prefetch company problems (useful when hovering over company card)
 */
export function usePrefetchCompanyProblems() {
	const queryClient = useQueryClient();

	return (slug: string) => {
		queryClient.prefetchQuery({
			queryKey: queryKeys.leetcode.companyProblems(slug, {}),
			queryFn: () => api.leetcode.getCompanyProblems(slug),
			staleTime: 10 * 60 * 1000,
		});
	};
}

// ============================================
// Cache Invalidation Helpers
// ============================================

/**
 * Hook to invalidate LeetCode caches
 */
export function useInvalidateLeetCode() {
	const queryClient = useQueryClient();

	return {
		// Invalidate all LeetCode data
		invalidateAll: () => queryClient.invalidateQueries({ queryKey: queryKeys.leetcode.all }),

		// Invalidate specific caches
		invalidateProblems: () =>
			queryClient.invalidateQueries({ queryKey: [...queryKeys.leetcode.all, 'problems'] }),
		invalidateCompanies: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.leetcode.companies() }),
		invalidateCompanyProblems: (slug: string) =>
			queryClient.invalidateQueries({
				queryKey: [...queryKeys.leetcode.all, 'company', slug],
			}),
	};
}
