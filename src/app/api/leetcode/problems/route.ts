import { NextRequest, NextResponse } from 'next/server';
import db from '@/server/db';
import { unstable_cache } from 'next/cache';

// Cache the problems query for better performance
const getCachedProblems = unstable_cache(
	async (
		where: any,
		skip: number,
		pageSize: number,
		orderBy: any,
		sortBy: string,
		sortDirection: string,
	) => {
		// For questionNumber sorting, use the integer column for proper numeric sorting
		if (sortBy === 'questionNumber') {
			const problems = await db.problem.findMany({
				where,
				include: {
					topics: {
						select: {
							id: true,
							name: true,
							slug: true,
						},
					},
					companyStats: {
						include: {
							company: {
								select: {
									id: true,
									name: true,
									slug: true,
									logoUrl: true,
								},
							},
						},
						orderBy: {
							priorityScore: 'desc',
						},
						take: 5,
					},
				},
				orderBy: {
					// Use questionNumberInt for proper numeric sorting
					questionNumberInt: sortDirection as 'asc' | 'desc',
				},
				skip,
				take: pageSize,
			});
			return problems;
		}

		// For other fields, use standard Prisma query
		return db.problem.findMany({
			where,
			skip,
			take: pageSize,
			orderBy,
			include: {
				topics: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
				companyStats: {
					include: {
						company: {
							select: {
								id: true,
								name: true,
								slug: true,
								logoUrl: true,
							},
						},
					},
					orderBy: {
						priorityScore: 'desc',
					},
					take: 5,
				},
			},
		});
	},
	['problems-list'],
	{
		revalidate: 300, // Cache for 5 minutes
		tags: ['leetcode-problems'],
	},
);

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;

		// Pagination params
		const page = parseInt(searchParams.get('page') || '1');
		const pageSize = parseInt(searchParams.get('pageSize') || '20');
		const skip = (page - 1) * pageSize;

		// Filter params
		const difficulty = searchParams.get('difficulty'); // Easy, Medium, Hard
		const topic = searchParams.get('topic'); // topic slug
		const search = searchParams.get('search'); // search query
		const sortBy = searchParams.get('sortBy') || 'questionNumber'; // questionNumber, difficulty, acceptanceRate
		const sortOrder = searchParams.get('sortOrder') || 'asc'; // asc, desc

		// Build where clause
		const where: any = {};

		if (difficulty) {
			where.difficulty = difficulty;
		}

		if (topic) {
			where.topics = {
				some: {
					slug: topic,
				},
			};
		}

		if (search) {
			where.OR = [
				{ title: { contains: search, mode: 'insensitive' } },
				{ questionNumber: { contains: search, mode: 'insensitive' } },
			];
		}

		// Build orderBy based on sortBy field
		let orderBy: any = {};
		const sortDirection = sortOrder === 'desc' ? 'desc' : 'asc';

		if (sortBy === 'difficulty') {
			orderBy = { difficulty: sortDirection };
		} else if (sortBy === 'acceptanceRate') {
			orderBy = { acceptanceRate: sortDirection };
		} else {
			orderBy = { questionNumber: sortDirection };
		}

		// Get total count (cached)
		const total = await db.problem.count({ where });

		// Get problems with caching
		const problems = await getCachedProblems(where, skip, pageSize, orderBy, sortBy, sortDirection);

		// Transform data to match frontend interface
		const transformedProblems = problems.map((problem: any) => ({
			id: problem.id,
			questionNumber: problem.questionNumber,
			title: problem.title,
			titleSlug: problem.titleSlug,
			difficulty: problem.difficulty || 'Medium',
			acceptanceRate: problem.acceptanceRate,
			hasSolution: problem.hasSolution,
			hasVideoSolution: problem.hasVideoSolution,
			isPaidOnly: problem.isPaidOnly,
			status: problem.status,
			topics: problem.topics,
			companies: problem.companyStats.map((cs: any) => ({
				id: cs.company.id,
				name: cs.company.name,
				slug: cs.company.slug,
				logoUrl: cs.company.logoUrl,
				frequency: cs.frequencyAllTime,
			})),
		}));

		return NextResponse.json({
			problems: transformedProblems,
			total,
			page,
			pageSize,
			totalPages: Math.ceil(total / pageSize),
		});
	} catch (error: any) {
		console.error('Error fetching problems:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
