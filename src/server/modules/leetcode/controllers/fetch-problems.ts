import { ProblemSetQuestionListData } from '../scripts/save-each-question';

type FetchProblemsOptions = {
	limit?: number;
	skip?: number;
	tags?: string;
	difficulty?: string;
};

export const FetchProblems = async <T = ProblemSetQuestionListData>(
	options: FetchProblemsOptions,
	formatData?: (data: ProblemSetQuestionListData) => T,
) => {
	try {
		// If skip is provided but limit is not, default limit = 1
		const limit =
			options.skip !== undefined && options.limit === undefined ? 1 : (options.limit ?? 20);

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
		console.log(JSON.stringify(result.data, null, 2));
		return formatData ? formatData(result.data) : result.data;
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
