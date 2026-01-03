// import { ProblemSetQuestionListData } from '../types';

// export const FetchProblems = async (
// 	options: {
// 		limit?: number;
// 		skip?: number;
// 		tags?: string;
// 		difficulty?: string;
// 	},
// 	query: string,
// 	formatData?: (data: ProblemSetQuestionListData) => object,
// ) => {
// 	try {
// 		// Set default limit to 1 if only skip is provided
// 		const limit =
// 			options.skip !== undefined && options.limit === undefined ? 1 : options.limit || 20;
// 		const skip = options.skip || 0; // Default to 0 if not provided
// 		const tags = options.tags ? options.tags.split(' ') : []; // Split tags or default to empty array
// 		const difficulty = options.difficulty || undefined; // difficulty has to be 'EASY', 'MEDIUM' or 'HARD'

// 		const response = await fetch('https://leetcode.com/graphql', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Referer: 'https://leetcode.com',
// 			},
// 			body: JSON.stringify({
// 				query: query,
// 				variables: {
// 					categorySlug: '',
// 					skip,
// 					limit,
// 					filters: {
// 						tags,
// 						difficulty,
// 					},
// 				},
// 			}),
// 		});

// 		const result = await response.json();

// 		if (result.errors) {
// 			throw new Error(JSON.stringify(result.errors));
// 		}
// 		return formatData ? formatData(result.data) : result.data;
// 	} catch (err) {
// 		console.error('Error: ', err);
// 		throw err;
// 	}
// };
