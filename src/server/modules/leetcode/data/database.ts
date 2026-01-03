import prisma from '../../../db';
import type { MergedRow } from './types';

/**
 * Database operations for LeetCode problems
 */

/**
 * Save merged problem data to database
 */
export async function saveMergedProblems(
	problems: MergedRow[],
	companyName: string,
): Promise<void> {
	// 1. Find or create the company
	const company = await prisma.company.upsert({
		where: { name: companyName },
		update: {},
		create: {
			name: companyName,
			slug: companyName.toLowerCase().replace(/ /g, '-'),
		},
	});

	console.log(`[Database] Processing ${problems.length} problems for ${companyName}...`);

	for (const p of problems) {
		// 2. Upsert the Master Problem (Single Source of Truth)
		// We use titleSlug as the unique key
		const titleSlug =
			p.Link.split('/problems/')[1]?.split('/')[0] || p.Title.toLowerCase().replace(/ /g, '-');

		const problem = await prisma.problem.upsert({
			where: { titleSlug },
			update: {
				// Optionally update acceptance/difficulty if we trust this source
				acceptanceRate: p.AcceptanceRate,
				// Don't overwrite title if it exists, as master might be cleaner
			},
			create: {
				title: p.Title,
				titleSlug,
				difficulty: p.Difficulty, // "Easy", "Medium", "Hard"
				acceptanceRate: p.AcceptanceRate,
				topics: p.Topics ? p.Topics.split(';').map((t) => t.trim()) : [],
			},
		});

		// 3. Upsert the Company-Problem Link (The Stats)
		await prisma.companyProblem.upsert({
			where: {
				companyId_problemId: {
					companyId: company.id,
					problemId: problem.id,
				},
			},
			update: {
				priorityScore: parseFloat(p.PriorityScore),
				frequency30Days: Number(p['30 Days']) || 0,
				frequency3Months: Number(p['3 Months']) || 0,
				frequency6Months: Number(p['6 Months']) || 0,
				frequencyAllTime: Number(p['All']) || 0,
			},
			create: {
				companyId: company.id,
				problemId: problem.id,
				priorityScore: parseFloat(p.PriorityScore),
				frequency30Days: Number(p['30 Days']) || 0,
				frequency3Months: Number(p['3 Months']) || 0,
				frequency6Months: Number(p['6 Months']) || 0,
				frequencyAllTime: Number(p['All']) || 0,
			},
		});
	}

	console.log(`[Database] Successfully saved ${problems.length} problems for ${companyName}`);
}

/**
 * Clear existing problems for a company before inserting new data
 */
export async function clearCompanyProblems(companyName: string): Promise<void> {
	const company = await prisma.company.findUnique({ where: { name: companyName } });
	if (!company) return;

	await prisma.companyProblem.deleteMany({
		where: { companyId: company.id },
	});

	console.log(`[Database] Cleared existing problems for ${companyName}`);
}
