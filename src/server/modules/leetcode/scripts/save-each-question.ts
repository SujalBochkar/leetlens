import prisma from '@/server/db';
import { FetchProblems } from '../controllers/fetch-problems';

type LeetCodeTopicTag = {
	name: string;
	id: string;
	slug: string;
};

type LeetCodeQuestion = {
	acRate: number;
	difficulty: string;
	freqBar: number | null;
	questionFrontendId: string;
	isFavor: boolean;
	isPaidOnly: boolean;
	status: string | null;
	title: string;
	titleSlug: string;
	topicTags: LeetCodeTopicTag[];
	hasSolution: boolean;
	hasVideoSolution: boolean;
};

export type ProblemSetQuestionListData = {
	problemsetQuestionList: {
		total: number;
		questions: LeetCodeQuestion[];
	};
};

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

			topics: q.topicTags.map((tag) => {
				return { name: tag.name, slug: tag.slug };
			}),
		}),
	);
};

const main = async () => {
	try {
		const skip = 0;
		const limit = 4; // Adjust the limit as needed for batch syncing

		console.log(`🚀 Fetching ${limit} problems starting from offset ${skip}...`);
		const problems = (await FetchProblems(
			{
				limit,
				skip,
			},
			formatData,
		)) as ProblemCreateInput[];
		console.log(JSON.stringify(problems, null, 2));
		console.log(`📂 Found ${problems.length} problems. Saving to database...`);

		for (const problem of problems) {
			await prisma.problem.upsert({
				where: { titleSlug: problem.titleSlug },
				update: {
					title: problem.title,
					difficulty: problem.difficulty,
					acceptanceRate: problem.acceptanceRate,
					hasSolution: problem.hasSolution,
					hasVideoSolution: problem.hasVideoSolution,
					isPaidOnly: problem.isPaidOnly,
					status: problem.status,
					topics: {
						set: [], // Clear existing relations to refresh them
						connect: problem.topics.map((t) => ({ slug: t.slug })),
					},
				},
				create: {
					title: problem.title,
					titleSlug: problem.titleSlug,
					difficulty: problem.difficulty,
					acceptanceRate: problem.acceptanceRate,
					hasSolution: problem.hasSolution,
					hasVideoSolution: problem.hasVideoSolution,
					isPaidOnly: problem.isPaidOnly,
					status: problem.status,
					topics: {
						connect: problem.topics.map((t) => ({ slug: t.slug })),
					},
				},
			});
		}

		console.log('✨ All problems saved successfully!');
	} catch (error) {
		console.error('❌ Error syncing problems:', error);
	} finally {
		await prisma.$disconnect();
	}
};

main();
