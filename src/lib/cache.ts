import { unstable_cache } from 'next/cache';
import db from '@/server/db';

/**
 * Server-side caching utilities using Next.js unstable_cache
 * These cache database queries on the server
 */

// ============================================
// Cache Tags for Revalidation
// ============================================
export const cacheTags = {
	leetcode: {
		problems: 'leetcode-problems',
		companies: 'leetcode-companies',
		topics: 'leetcode-topics',
		stats: 'leetcode-stats',
	},
};

// ============================================
// Cached Database Queries
// ============================================

/**
 * Get total problem count (cached for 1 hour)
 */
export const getCachedProblemCount = unstable_cache(
	async () => {
		return db.problem.count();
	},
	['problem-count'],
	{
		revalidate: 3600, // 1 hour
		tags: [cacheTags.leetcode.stats],
	},
);

/**
 * Get difficulty distribution (cached for 1 hour)
 */
export const getCachedDifficultyStats = unstable_cache(
	async () => {
		const stats = await db.problem.groupBy({
			by: ['difficulty'],
			_count: {
				difficulty: true,
			},
		});

		return stats.reduce(
			(acc, item) => {
				if (item.difficulty) {
					acc[item.difficulty.toLowerCase()] = item._count.difficulty;
				}
				return acc;
			},
			{} as Record<string, number>,
		);
	},
	['difficulty-stats'],
	{
		revalidate: 3600, // 1 hour
		tags: [cacheTags.leetcode.stats],
	},
);

/**
 * Get company count (cached for 1 hour)
 */
export const getCachedCompanyCount = unstable_cache(
	async () => {
		return db.company.count();
	},
	['company-count'],
	{
		revalidate: 3600, // 1 hour
		tags: [cacheTags.leetcode.companies],
	},
);

/**
 * Get all companies (cached for 30 minutes)
 */
export const getCachedCompanies = unstable_cache(
	async () => {
		return db.company.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
				logoUrl: true,
				_count: {
					select: {
						problems: true,
					},
				},
			},
			orderBy: {
				problems: {
					_count: 'desc',
				},
			},
		});
	},
	['all-companies'],
	{
		revalidate: 1800, // 30 minutes
		tags: [cacheTags.leetcode.companies],
	},
);

/**
 * Get all topics (cached for 1 hour)
 */
export const getCachedTopics = unstable_cache(
	async () => {
		return db.topic.findMany({
			select: {
				id: true,
				name: true,
				slug: true,
				_count: {
					select: {
						problems: true,
					},
				},
			},
			orderBy: {
				problems: {
					_count: 'desc',
				},
			},
		});
	},
	['all-topics'],
	{
		revalidate: 3600, // 1 hour
		tags: [cacheTags.leetcode.topics],
	},
);

/**
 * Get overall LeetCode stats (cached for 15 minutes)
 */
export const getCachedLeetCodeStats = unstable_cache(
	async () => {
		const [totalProblems, companyCount, difficultyStats] = await Promise.all([
			db.problem.count(),
			db.company.count(),
			db.problem.groupBy({
				by: ['difficulty'],
				_count: {
					difficulty: true,
				},
			}),
		]);

		const difficulties = difficultyStats.reduce(
			(acc, item) => {
				if (item.difficulty) {
					acc[item.difficulty.toLowerCase()] = item._count.difficulty;
				}
				return acc;
			},
			{ easy: 0, medium: 0, hard: 0 } as Record<string, number>,
		);

		return {
			totalProblems,
			companyCount,
			...difficulties,
		};
	},
	['leetcode-stats'],
	{
		revalidate: 900, // 15 minutes
		tags: [cacheTags.leetcode.stats],
	},
);
