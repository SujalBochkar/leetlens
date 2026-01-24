import { NextResponse } from 'next/server';
import prisma from '@/server/db';

/**
 * API route to save a single LeetCode problem for a company.
 * This can be used by external scripts to sync data without a direct DB connection.
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { problem, companyName } = body;

		if (!problem || !companyName) {
			return NextResponse.json({ error: 'Missing problem or companyName' }, { status: 400 });
		}

		// 1. Find or create the company
		const company = await prisma.company.upsert({
			where: { name: companyName },
			update: {},
			create: {
				name: companyName,
				slug: companyName.toLowerCase().replace(/ /g, '-'),
			},
		});

		// 2. Upsert the Master Problem
		const titleSlug =
			problem.Link.split('/problems/')[1]?.split('/')[0] ||
			problem.Title.toLowerCase().replace(/ /g, '-');

		const problemRecord = await prisma.problem.upsert({
			where: { titleSlug },
			update: {
				acceptanceRate: problem.AcceptanceRate,
				difficulty: problem.Difficulty,
			},
			create: {
				title: problem.Title,
				titleSlug,
				difficulty: problem.Difficulty,
				acceptanceRate: problem.AcceptanceRate,
				topics: problem.Topics ? problem.Topics.split(';').map((t: string) => t.trim()) : [],
			},
		});

		// 3. Upsert the Company-Problem Link (The Stats)
		await prisma.companyProblem.upsert({
			where: {
				companyId_problemId: {
					companyId: company.id,
					problemId: problemRecord.id,
				},
			},
			update: {
				priorityScore: parseFloat(problem.PriorityScore),
				frequency30Days: Number(problem['30 Days']) || 0,
				frequency3Months: Number(problem['3 Months']) || 0,
				frequency6Months: Number(problem['6 Months']) || 0,
				frequencyAllTime: Number(problem['All']) || 0,
			},
			create: {
				companyId: company.id,
				problemId: problemRecord.id,
				priorityScore: parseFloat(problem.PriorityScore),
				frequency30Days: Number(problem['30 Days']) || 0,
				frequency3Months: Number(problem['3 Months']) || 0,
				frequency6Months: Number(problem['6 Months']) || 0,
				frequencyAllTime: Number(problem['All']) || 0,
			},
		});

		return NextResponse.json({
			success: true,
			message: `Problem "${problem.Title}" saved for ${companyName}`,
		});
	} catch (error: any) {
		console.error('[API Save Problem Error]:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
