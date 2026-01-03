// import type { Response } from 'express';
// import { Contest } from '../types';

// export const FetchAllContests = async (res: Response, query: string) => {
// 	try {
// 		const response = await fetch('https://leetcode.com/graphql', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Referer: 'https://leetcode.com',
// 			},
// 			body: JSON.stringify({
// 				query: query,
// 			}),
// 		});

// 		const result = await response.json();
// 		if (!response.ok) {
// 			console.error(`HTTP error! status: ${response.status}`);
// 		}
// 		if (result.errors) {
// 			return res.send(result);
// 		}

// 		return res.json(result.data);
// 	} catch (err) {
// 		console.error('Error: ', err);
// 		return res.send(err);
// 	}
// };

// export const FetchUpcomingContests = async (res: Response, query: string) => {
// 	try {
// 		const response = await fetch('https://leetcode.com/graphql', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Referer: 'https://leetcode.com',
// 			},
// 			body: JSON.stringify({
// 				query: query,
// 			}),
// 		});

// 		const result = await response.json();
// 		if (!response.ok) {
// 			console.error(`HTTP error! status: ${response.status}`);
// 		}
// 		if (result.errors) {
// 			return res.send(result);
// 		}

// 		const now = Math.floor(Date.now() / 1000);
// 		const allContests = result.data.allContests || [];

// 		const upcomingContests = allContests.filter((contest: Contest) => contest.startTime > now);

// 		return res.json({
// 			count: upcomingContests.length,
// 			contests: upcomingContests,
// 		});
// 	} catch (err) {
// 		console.error('Error: ', err);
// 		return res.send(err);
// 	}
// };
