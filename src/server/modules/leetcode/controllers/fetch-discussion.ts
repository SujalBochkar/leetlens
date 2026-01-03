// import type { Response } from 'express';
// import { TrendingDiscussionObject } from '../types';

// export const FetchDiscussion = async (
// 	options: { first: number },
// 	res: Response,
// 	query: string,
// 	formatData?: (data: TrendingDiscussionObject) => object,
// ) => {
// 	try {
// 		const response = await fetch('https://leetcode.com/graphql', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Referer: 'https://leetcode.com',
// 			},
// 			body: JSON.stringify({
// 				query: query,
// 				variables: {
// 					first: options.first || 20, //by default get 20 question
// 				},
// 			}),
// 		});

// 		const result = await response.json();

// 		if (result.errors) {
// 			return res.send(result);
// 		}

// 		return res.json(formatData ? formatData(result.data) : result.data);
// 	} catch (err) {
// 		console.error('Error: ', err);
// 		return res.send(err);
// 	}
// };
