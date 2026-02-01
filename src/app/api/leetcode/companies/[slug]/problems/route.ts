import { NextRequest, NextResponse } from 'next/server';
import db from '@/server/db';

interface RouteParams {
	params: Promise<{
		slug: string;
	}>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
	try {
		const { slug } = await params;
		const searchParams = request.nextUrl.searchParams;

		// Pagination params
		const page = parseInt(searchParams.get('page') || '1');
		const pageSize = parseInt(searchParams.get('pageSize') || '20');
		const skip = (page - 1) * pageSize;

		// Filter params
		const difficulty = searchParams.get('difficulty');
		const timeFrame = searchParams.get('timeFrame') || 'all'; // 30days, 3months, 6months, all
		const sortBy = searchParams.get('sortBy') || 'frequency'; // frequency, difficulty, questionNumber
		const sortOrder = searchParams.get('sortOrder') || 'desc';

		// Find company
		const company = await db.company.findUnique({
			where: { slug },
			select: {
				id: true,
				name: true,
				slug: true,
				logoUrl: true,
			},
		});

		if (!company) {
			return NextResponse.json({ error: 'Company not found' }, { status: 404 });
		}

		// Build where clause for problems
		const problemWhere: any = {
			companyStats: {
				some: {
					companyId: company.id,
				},
			},
		};

		if (difficulty) {
			problemWhere.difficulty = difficulty;
		}

		// Determine frequency field based on timeFrame
		const frequencyField =
			{
				'30days': 'frequency30Days',
				'3months': 'frequency3Months',
				'6months': 'frequency6Months',
				all: 'frequencyAllTime',
			}[timeFrame] || 'frequencyAllTime';

		// Build orderBy based on sort options
		type SortDirection = 'asc' | 'desc';
		const direction = sortOrder as SortDirection;

		let orderByClause: any;
		let needsClientSideSort = false;

		if (sortBy === 'frequency') {
			orderByClause = { [frequencyField]: direction };
		} else if (sortBy === 'priorityScore') {
			orderByClause = { priorityScore: direction };
		} else if (sortBy === 'difficulty') {
			orderByClause = { problem: { difficulty: direction } };
		} else if (sortBy === 'title') {
			orderByClause = { problem: { title: direction } };
		} else if (sortBy === 'acceptanceRate') {
			orderByClause = { problem: { acceptanceRate: direction } };
		} else if (sortBy === 'questionNumber') {
			// questionNumber is stored as string, need client-side numerical sort
			needsClientSideSort = true;
			orderByClause = { [frequencyField]: 'desc' }; // Default sort while fetching
		} else {
			orderByClause = { problem: { questionNumber: direction } };
		}

		let companyProblems: any[];
		let total: number;

		if (needsClientSideSort) {
			// Fetch all problems for client-side numerical sorting
			const allProblems = await db.companyProblem.findMany({
				where: {
					companyId: company.id,
					...(difficulty && {
						problem: {
							difficulty,
						},
					}),
				},
				include: {
					problem: {
						include: {
							topics: {
								select: {
									id: true,
									name: true,
									slug: true,
								},
							},
						},
					},
				},
			});

			// Sort numerically by questionNumber
			allProblems.sort((a: any, b: any) => {
				const numA = parseInt(a.problem.questionNumber || '0', 10);
				const numB = parseInt(b.problem.questionNumber || '0', 10);
				return direction === 'asc' ? numA - numB : numB - numA;
			});

			total = allProblems.length;
			companyProblems = allProblems.slice(skip, skip + pageSize);
		} else {
			// Use Prisma's built-in sorting
			[companyProblems, total] = await Promise.all([
				db.companyProblem.findMany({
					where: {
						companyId: company.id,
						...(difficulty && {
							problem: {
								difficulty,
							},
						}),
					},
					skip,
					take: pageSize,
					orderBy: orderByClause,
					include: {
						problem: {
							include: {
								topics: {
									select: {
										id: true,
										name: true,
										slug: true,
									},
								},
							},
						},
					},
				}),
				db.companyProblem.count({
					where: {
						companyId: company.id,
						...(difficulty && {
							problem: {
								difficulty,
							},
						}),
					},
				}),
			]);
		}

		// Transform data
		const transformedProblems = companyProblems.map((cp: any) => ({
			id: cp.problem.id,
			questionNumber: cp.problem.questionNumber,
			title: cp.problem.title,
			titleSlug: cp.problem.titleSlug,
			difficulty: cp.problem.difficulty || 'Medium',
			acceptanceRate: cp.problem.acceptanceRate,
			hasSolution: cp.problem.hasSolution,
			hasVideoSolution: cp.problem.hasVideoSolution,
			isPaidOnly: cp.problem.isPaidOnly,
			topics: cp.problem.topics,
			frequency: {
				'30days': cp.frequency30Days,
				'3months': cp.frequency3Months,
				'6months': cp.frequency6Months,
				all: cp.frequencyAllTime,
			},
			priorityScore: cp.priorityScore,
		}));

		// Get difficulty counts for this company
		const difficultyCounts = await db.companyProblem.groupBy({
			by: ['problemId'],
			where: {
				companyId: company.id,
			},
			_count: true,
		});

		// Get actual difficulty breakdown
		const difficultyStats = await db.problem.groupBy({
			by: ['difficulty'],
			where: {
				companyStats: {
					some: {
						companyId: company.id,
					},
				},
			},
			_count: true,
		});

		const stats = {
			total,
			easy: difficultyStats.find((d: any) => d.difficulty === 'Easy')?._count || 0,
			medium: difficultyStats.find((d: any) => d.difficulty === 'Medium')?._count || 0,
			hard: difficultyStats.find((d: any) => d.difficulty === 'Hard')?._count || 0,
		};

		return NextResponse.json({
			company,
			problems: transformedProblems,
			stats,
			total,
			page,
			pageSize,
			totalPages: Math.ceil(total / pageSize),
		});
	} catch (error: any) {
		console.error('Error fetching company problems:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
