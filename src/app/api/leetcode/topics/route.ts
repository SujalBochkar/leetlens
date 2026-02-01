import { NextRequest, NextResponse } from 'next/server';
import db from '@/server/db';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const search = searchParams.get('search');

		// Build where clause
		const where: any = {};
		if (search) {
			where.name = { contains: search, mode: 'insensitive' };
		}

		// Fetch topics with problem counts
		const topics = await db.topic.findMany({
			where,
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

		// Transform data
		const transformedTopics = topics.map((topic: any) => ({
			id: topic.id,
			name: topic.name,
			slug: topic.slug,
			problemCount: topic._count.problems,
		}));

		return NextResponse.json({
			topics: transformedTopics,
			total: transformedTopics.length,
		});
	} catch (error: any) {
		console.error('Error fetching topics:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
