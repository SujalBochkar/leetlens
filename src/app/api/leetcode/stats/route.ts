import { NextResponse } from 'next/server';
import { getCachedLeetCodeStats } from '@/lib/cache';

/**
 * GET /api/leetcode/stats
 * Returns cached LeetCode statistics
 */
export async function GET() {
	try {
		const stats = await getCachedLeetCodeStats();

		return NextResponse.json({
			success: true,
			data: stats,
		});
	} catch (error) {
		console.error('Error fetching stats:', error);
		return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
	}
}
