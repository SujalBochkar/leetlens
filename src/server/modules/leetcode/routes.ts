// import { Router } from 'express';
// import * as leetcodeServices from './service';

// const router = Router();

// // API Overview
// router.get('/', (_req, res) => {
// 	res.json({
// 		routes: {},
// 	});
// });

// // ==================== Problems Routes ====================
// // IMPORTANT: These must come BEFORE /:username routes
// router.get('/daily', leetcodeServices.dailyProblem);
// router.get('/daily/raw', leetcodeServices.dailyProblemRaw);
// router.get('/select', leetcodeServices.selectProblem);
// router.get('/select/raw', leetcodeServices.selectProblemRaw);
// router.get('/problems', leetcodeServices.problems);
// router.get('/official-solution', leetcodeServices.officialSolution);

// // ==================== Contests Routes ====================
// router.get('/contests', leetcodeServices.allContests);
// router.get('/contests/upcoming', leetcodeServices.upcomingContests);

// // ==================== Discussion Routes ====================
// router.get('/trending-discuss', leetcodeServices.trendingCategoryTopics);
// router.get('/discuss-topic/:topicId', leetcodeServices.discussTopic);
// router.get('/discuss-comments/:topicId', leetcodeServices.discussComments);

// // ==================== User Profile Routes ====================
// // Middleware to populate req.body with username from params
// router.param('username', (req: any, _res, next, username) => {
// 	req.body = { username };
// 	next();
// });

// // IMPORTANT: These dynamic routes must come LAST
// router.get('/:username', leetcodeServices.userData);
// router.get('/:username/profile/', leetcodeServices.userProfile);
// router.get('/:username/badges', leetcodeServices.userBadges);
// router.get('/:username/solved', leetcodeServices.solvedProblem);
// router.get('/:username/contest', leetcodeServices.userContest);
// router.get('/:username/contest/history', leetcodeServices.userContestHistory);
// router.get('/:username/submission', leetcodeServices.submission);
// router.get('/:username/ac-submission', leetcodeServices.acSubmission);
// router.get('/:username/calendar', leetcodeServices.calendar);
// router.get('/:username/skill/', leetcodeServices.skillStats);
// router.get('/:username/language', leetcodeServices.languageStats);
// router.get('/:username/progress/', leetcodeServices.progress);

// export default router;
