import prisma from '@/server/db';
import { FetchAllProblems, ProblemSetQuestionListData } from '../controllers/fetch-problems';
import fs from 'fs';
import path from 'path';

export type ProblemCreateInput = {
	questionFrontendId: string;
	title: string;
	titleSlug: string;
	difficulty: string;
	acceptanceRate: number;
	hasSolution: boolean;
	hasVideoSolution: boolean;
	isPaidOnly: boolean;
	status: string | null;
	topics: { name: string; slug: string }[];
};

const CACHE_FILE = path.join(__dirname, 'problems-cache.json');
const BATCH_SIZE = 5;

// Format API data to our structure
export const formatData = (data: ProblemSetQuestionListData): ProblemCreateInput[] => {
	return data.problemsetQuestionList.questions.map(
		(q): ProblemCreateInput => ({
			questionFrontendId: q.questionFrontendId,
			title: q.title,
			titleSlug: q.titleSlug,
			difficulty: q.difficulty,
			acceptanceRate: q.acRate,
			hasSolution: q.hasSolution,
			hasVideoSolution: q.hasVideoSolution,
			isPaidOnly: q.isPaidOnly,
			status: q.status,
			topics: q.topicTags.map((tag) => ({ name: tag.name, slug: tag.slug })),
		}),
	);
};

// Fetch problems from LeetCode API or read from cache
export const fetchProblems = async (forceRefresh = false): Promise<ProblemCreateInput[]> => {
	if (!forceRefresh && fs.existsSync(CACHE_FILE)) {
		const stats = fs.statSync(CACHE_FILE);
		const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

		if (ageHours < 24) {
			console.log(`📁 Reading from cache (${ageHours.toFixed(1)} hours old)...`);
			const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
			console.log(`📁 Loaded ${cached.length} problems from cache`);
			return cached;
		} else {
			console.log(`⚠️ Cache is stale (${ageHours.toFixed(1)} hours old), fetching fresh...`);
		}
	}

	const problems = await FetchAllProblems(formatData);
	fs.writeFileSync(CACHE_FILE, JSON.stringify(problems, null, 2));
	console.log(`💾 Cached ${problems.length} problems`);

	return problems;
};

// Save a single problem to database
const saveProblem = async (problem: ProblemCreateInput) => {
	return prisma.problem.create({
		data: {
			questionNumber: problem.questionFrontendId,
			title: problem.title,
			titleSlug: problem.titleSlug,
			difficulty: problem.difficulty,
			acceptanceRate: problem.acceptanceRate,
			hasSolution: problem.hasSolution,
			hasVideoSolution: problem.hasVideoSolution,
			isPaidOnly: problem.isPaidOnly,
			status: problem.status,
			topics: {
				connectOrCreate: problem.topics.map((t) => ({
					where: { slug: t.slug },
					create: { name: t.name, slug: t.slug },
				})),
			},
		},
	});
};

// Update an existing problem in database
const updateProblem = async (problem: ProblemCreateInput) => {
	return prisma.problem.update({
		where: { titleSlug: problem.titleSlug },
		data: {
			questionNumber: problem.questionFrontendId,
			title: problem.title,
			difficulty: problem.difficulty,
			acceptanceRate: problem.acceptanceRate,
			hasSolution: problem.hasSolution,
			hasVideoSolution: problem.hasVideoSolution,
			isPaidOnly: problem.isPaidOnly,
			status: problem.status,
			topics: {
				set: [],
				connectOrCreate: problem.topics.map((t) => ({
					where: { slug: t.slug },
					create: { name: t.name, slug: t.slug },
				})),
			},
		},
	});
};

// Get existing problem slugs from database
const getExistingSlugs = async (): Promise<Set<string>> => {
	const existing = await prisma.problem.findMany({ select: { titleSlug: true } });
	return new Set(existing.map((p) => p.titleSlug));
};

// Options for syncing
type SyncOptions = {
	forceRefresh?: boolean; // Force refresh from API (ignore cache)
	forceUpdate?: boolean; // Force update existing problems in DB
};

// Main sync function
export const syncProblems = async (options: SyncOptions = {}) => {
	const { forceRefresh = false, forceUpdate = false } = options;

	console.log('🚀 Starting LeetCode problem sync...\n');
	console.log(`⚙️  Options: forceRefresh=${forceRefresh}, forceUpdate=${forceUpdate}\n`);

	const problems = await fetchProblems(forceRefresh);
	console.log(`\n📂 Found ${problems.length} problems.`);

	const existingSlugs = await getExistingSlugs();
	console.log(`📊 ${existingSlugs.size} problems already in DB`);

	// Determine what to save/update
	let problemsToCreate = problems.filter((p) => !existingSlugs.has(p.titleSlug));
	let problemsToUpdate = forceUpdate ? problems.filter((p) => existingSlugs.has(p.titleSlug)) : [];

	console.log(`📝 ${problemsToCreate.length} new, ${problemsToUpdate.length} to update\n`);

	if (problemsToCreate.length === 0 && problemsToUpdate.length === 0) {
		console.log('✅ Nothing to sync!');
		return;
	}

	const startTime = Date.now();
	let saved = 0;
	let updated = 0;

	// Create new problems
	if (problemsToCreate.length > 0) {
		console.log(`\n📥 Creating ${problemsToCreate.length} new problems...`);
		for (let i = 0; i < problemsToCreate.length; i += BATCH_SIZE) {
			const batch = problemsToCreate.slice(i, i + BATCH_SIZE);
			const batchStart = Date.now();

			for (const problem of batch) {
				await saveProblem(problem);
			}

			saved += batch.length;
			const batchTime = ((Date.now() - batchStart) / 1000).toFixed(1);
			const total = ((Date.now() - startTime) / 1000).toFixed(1);
			console.log(
				`💾 Created ${saved}/${problemsToCreate.length} (Batch: ${batchTime}s | Total: ${total}s)`,
			);
		}
	}

	// Update existing problems
	if (problemsToUpdate.length > 0) {
		console.log(`\n🔄 Updating ${problemsToUpdate.length} existing problems...`);
		for (let i = 0; i < problemsToUpdate.length; i += BATCH_SIZE) {
			const batch = problemsToUpdate.slice(i, i + BATCH_SIZE);
			const batchStart = Date.now();

			for (const problem of batch) {
				await updateProblem(problem);
			}

			updated += batch.length;
			const batchTime = ((Date.now() - batchStart) / 1000).toFixed(1);
			const total = ((Date.now() - startTime) / 1000).toFixed(1);
			console.log(
				`� Updated ${updated}/${problemsToUpdate.length} (Batch: ${batchTime}s | Total: ${total}s)`,
			);
		}
	}

	const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
	console.log(`\n✨ Sync complete! Created: ${saved}, Updated: ${updated} (${totalTime}s)`);
};

// CLI execution
const main = async () => {
	try {
		// Parse CLI args: --force-refresh, --force-update
		const forceRefresh = process.argv.includes('--force-refresh');
		const forceUpdate = process.argv.includes('--force-update');

		await syncProblems({ forceRefresh, forceUpdate });
	} catch (error) {
		console.error('❌ Error syncing problems:', error);
	} finally {
		await prisma.$disconnect();
	}
};

main();
