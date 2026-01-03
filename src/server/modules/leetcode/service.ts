// import * as controllers from './controllers';
// import * as leetcodeQueries from './queries';

// // ==================== User Profile Services ====================
// export const userData = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.UserProfile);
// };

// export const userProfile = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.GetUserProfile);
// };

// export const userBadges = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.UserProfile);
// };

// export const solvedProblem = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.UserProfile);
// };

// export const userContest = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.Contest);
// };

// export const userContestHistory = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.Contest);
// };

// export const submission = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.RecentSubmit);
// };

// export const acSubmission = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.RecentAcSubmit);
// };

// export const calendar = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.UserProfileCalendar);
// };

// export const skillStats = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.SkillStats);
// };

// export const languageStats = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.LanguageStats);
// };

// export const progress = (req: Request, res: Response) => {
// 	controllers.FetchUserDetails(req.body, res, leetcodeQueries.UserQuestionProgress);
// };

// // ==================== Problems Services ====================
// export const dailyProblem = (_req: Request, res: Response) => {
// 	controllers.FetchSingleProblem(res, leetcodeQueries.DailyProblem, null);
// };

// export const dailyProblemRaw = (_req: Request, res: Response) => {
// 	controllers.FetchSingleProblem(res, leetcodeQueries.DailyProblem, null);
// };

// export const selectProblem = (req: Request, res: Response) => {
// 	const title = req.query.titleSlug as string;
// 	if (title !== undefined) {
// 		controllers.FetchSingleProblem(res, leetcodeQueries.SelectProblem, title);
// 	} else {
// 		res.status(400).json({
// 			error: 'Missing or invalid query parameter: titleSlug',
// 			solution: 'put query after select',
// 			example: 'localhost:3000/select?titleSlug=two-sum',
// 		});
// 	}
// };

// export const selectProblemRaw = (req: Request, res: Response) => {
// 	const title = req.query.titleSlug as string;
// 	if (title !== undefined) {
// 		controllers.FetchSingleProblem(res, leetcodeQueries.SelectProblem, title);
// 	} else {
// 		res.status(400).json({
// 			error: 'Missing or invalid query parameter: titleSlug',
// 			solution: 'put query after select',
// 			example: 'localhost:3000/select?titleSlug=two-sum',
// 		});
// 	}
// };

// export const problems = (
// 	req: Request<
// 		object,
// 		object,
// 		object,
// 		{ limit: number; skip: number; tags: string; difficulty: string }
// 	>,
// 	res: Response,
// ) => {
// 	const difficulty = req.query.difficulty;
// 	const limit = req.query.limit;
// 	const skip = req.query.skip;
// 	const tags = req.query.tags;

// 	controllers.FetchProblems({ limit, skip, tags, difficulty }, res, leetcodeQueries.ProblemList);
// };

// export const officialSolution = (req: Request, res: Response) => {
// 	const { titleSlug } = req.query;

// 	if (!titleSlug) {
// 		return res.status(400).json({ error: 'Missing titleSlug query parameter' });
// 	}
// 	return controllers.HandleRequest(res, leetcodeQueries.OfficialSolution, {
// 		titleSlug,
// 	});
// };

// // ==================== Contests Services ====================
// export const allContests = (_req: Request, res: Response) => {
// 	controllers.FetchAllContests(res, leetcodeQueries.AllContests);
// };

// export const upcomingContests = (_req: Request, res: Response) => {
// 	controllers.FetchUpcomingContests(res, leetcodeQueries.AllContests);
// };

// // ==================== Discussion Services ====================
// export const trendingCategoryTopics = (_req: Request, res: Response) => {
// 	const first = parseInt(_req.query.first as string, 10);
// 	if (!Number.isNaN(first)) {
// 		controllers.FetchDiscussion({ first }, res, leetcodeQueries.TrendingDiscuss);
// 	} else {
// 		res.status(400).json({
// 			error: 'Missing or invalid query parameter: limit',
// 			solution: 'put query after discussion',
// 			example: 'localhost:3000/trendingDiscuss?first=20',
// 		});
// 	}
// };

// export const discussTopic = (req: Request, res: Response) => {
// 	const topicId = parseInt(req.params.topicId, 10);
// 	controllers.HandleRequest(res, leetcodeQueries.DiscussTopic, { topicId });
// };

// export const discussComments = (req: Request, res: Response) => {
// 	const topicId = parseInt(req.params.topicId, 10);
// 	const { orderBy = 'newest_to_oldest', pageNo = 1, numPerPage = 10 } = req.query;
// 	controllers.HandleRequest(res, leetcodeQueries.DiscussComments, {
// 		topicId,
// 		orderBy,
// 		pageNo,
// 		numPerPage,
// 	});
// };
