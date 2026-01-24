export const MAX_LEETCODE_PROBLEMS = 3817;

// Types for LeetCode API response
export type ProblemSetQuestionListData = {
	problemsetQuestionList: {
		total: number;
		questions: {
			acRate: number;
			difficulty: string;
			freqBar: number | null;
			questionFrontendId: string;
			isFavor: boolean;
			isPaidOnly: boolean;
			status: string | null;
			title: string;
			titleSlug: string;
			topicTags: { name: string; id: string; slug: string }[];
			hasSolution: boolean;
			hasVideoSolution: boolean;
		}[];
	};
};

type FetchProblemsOptions = {
	limit?: number;
	skip?: number;
	tags?: string;
	difficulty?: string;
};

// Random delay between min and max seconds
const randomDelay = (minSec: number, maxSec: number) => {
	const ms = Math.floor(Math.random() * (maxSec - minSec) * 1000) + minSec * 1000;
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// Fetch ALL problems with pagination (LeetCode limits to 100 per request)
export const FetchAllProblems = async <T>(
	formatData: (data: ProblemSetQuestionListData) => T[],
): Promise<T[]> => {
	const BATCH_SIZE = 100;
	const allProblems: T[] = [];
	let skip = 0;

	// First fetch to get total count
	const startTime = Date.now();
	console.log('🚀 Fetching first batch to get total count...');
	const firstResult = await FetchProblems({ limit: BATCH_SIZE, skip: 0 });

	if (!firstResult.problemsetQuestionList) {
		throw new Error('Failed to fetch problems');
	}

	const total = firstResult.problemsetQuestionList.total;
	const totalBatches = Math.ceil(total / BATCH_SIZE);

	// Add first batch
	allProblems.push(...formatData(firstResult));
	console.log(`📦 Batch 1/${totalBatches} fetched (${allProblems.length}/${total} problems)`);

	skip = BATCH_SIZE;
	let currentBatch = 2;

	while (skip < total) {
		// Random delay 2-4 seconds
		const delay = 2 + Math.random() * 2;
		console.log(`⏳ Waiting ${delay.toFixed(1)}s before next batch...`);
		await randomDelay(2, 4);

		const result = await FetchProblems({ limit: BATCH_SIZE, skip });

		if (!result.problemsetQuestionList) break;

		allProblems.push(...formatData(result));
		console.log(
			`📦 Batch ${currentBatch}/${totalBatches} fetched (${allProblems.length}/${total} problems)`,
		);

		skip += BATCH_SIZE;
		currentBatch++;
	}

	const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
	console.log(
		`✅ Fetched all ${allProblems.length} problems in ${totalBatches} batches (Took: ${elapsed}s)`,
	);
	return allProblems;
};

export const FetchProblems = async (options: FetchProblemsOptions) => {
	try {
		const limit = options.limit ?? 100;
		const skip = options.skip ?? 0;

		const tags = options.tags ? options.tags.split(' ') : [];
		const difficulty = options.difficulty || undefined;

		const response = await fetch('https://leetcode.com/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Referer: 'https://leetcode.com',
			},
			body: JSON.stringify({
				query: ProblemList,
				variables: {
					categorySlug: '',
					skip,
					limit,
					filters: {
						tags,
						difficulty,
					},
				},
			}),
		});

		const result: { data: ProblemSetQuestionListData; errors?: unknown } = await response.json();

		if (result.errors) {
			throw new Error(JSON.stringify(result.errors));
		}

		return result.data;
	} catch (err) {
		console.error('Error fetching problems:', err);
		throw err;
	}
};

export const ProblemList = `#graphql
query getProblems(
  $categorySlug: String,
  $limit: Int,
  $skip: Int,
  $filters: QuestionListFilterInput
) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      acRate
      difficulty
      freqBar
      questionFrontendId
      isFavor
      isPaidOnly
      status
      title
      titleSlug
      topicTags {
        name
        id
        slug
      }
      hasSolution
      hasVideoSolution
    }
  }
}
`;
