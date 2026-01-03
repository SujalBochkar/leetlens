// ==================== User Profile Queries ====================
export const UserProfile = `#graphql
query getUserProfile($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        username
        githubUrl
        twitterUrl
        linkedinUrl
        contributions {
            points
            questionCount
            testcaseCount
        }
        profile {
            realName
            userAvatar
            birthday
            ranking
            reputation
            websites
            countryName
            company
            school
            skillTags
            aboutMe
            starRating
        }
        badges {
            id
            displayName
            icon
            creationDate
        }
        upcomingBadges {
            name
            icon
        }
        activeBadge {
            id
            displayName
            icon
            creationDate
        }
        submitStats {
            totalSubmissionNum {
                difficulty
                count
                submissions
            }
            acSubmissionNum {
                difficulty
                count
                submissions
            }
        }
        submissionCalendar
    }
    recentSubmissionList(username: $username, limit: 20) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}`;

export const GetUserProfile = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    recentSubmissionList(username: $username) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
      __typename
    }
    matchedUserStats: matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
          __typename
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
          __typename
        }
        __typename
      }
    }
  }
`;

export const Contest = `#graphql
query getUserContestRanking ($username: String!) {
    userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
            name
        }
    }
    userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        contest {
            title
            startTime
        }
    }
}`;

export const UserContestRanking = `
    query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
        userContestRankingHistory(username: $username) {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
                title
                startTime
            }
        }
    }
`;

export const RecentSubmit = `#graphql
query getRecentSubmissions($username: String!, $limit: Int) {
    recentSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}`;

export const RecentAcSubmit = `#graphql
query getACSubmissions ($username: String!, $limit: Int) {
    recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}`;

export const UserProfileCalendar = `
    query UserProfileCalendar($username: String!, $year: Int!) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    }
`;

export const SkillStats = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }
`;

export const LanguageStats = `
    query languageStats($username: String!) {
        matchedUser(username: $username) {
            languageProblemCount {
                languageName
                problemsSolved
            }
        }
    }
`;

export const UserQuestionProgress = `
    query userProfileUserQuestionProgressV2($username: String!) {
        userProfileUserQuestionProgressV2(userSlug: $username) {
            numAcceptedQuestions {
                count
                difficulty
            }
            numFailedQuestions {
                count
                difficulty
            }
            numUntouchedQuestions {
                count
                difficulty
            }
            userSessionBeatsPercentage {
                difficulty
                percentage
            }
        }
    }
`;

// ==================== Problems Queries ====================
export const DailyProblem = `#graphql
  query getDailyProblem {
    activeDailyCodingChallengeQuestion {
        date
        link
        question {
            questionId
            questionFrontendId
            boundTopicId
            title
            titleSlug
            content
            translatedTitle
            translatedContent
            isPaidOnly
            difficulty
            likes
            dislikes
            isLiked
            similarQuestions
            exampleTestcases
            contributors {
                username
                profileUrl
                avatarUrl
            }
            topicTags {
                name
                slug
                translatedName
            }
            companyTagStats
            codeSnippets {
                lang
                langSlug
                code
            }
            stats
            hints
            solution {
                id
                canSeeDetail
                paidOnly
                hasVideoSolution
                paidOnlyVideo
            }
            status
            sampleTestCase
            metaData
            judgerAvailable
            judgeType
            mysqlSchemas
            enableRunCode
            enableTestMode
            enableDebugger
            envInfo
            libraryUrl
            adminUrl
            challengeQuestion {
                id
                date
                incompleteChallengeCount
                streakCount
                type
            }
            note
        }
    }
}`;

export const SelectProblem = `#graphql
query selectProblem($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        boundTopicId
        title
        titleSlug
        content
        translatedTitle
        translatedContent
        isPaidOnly
        difficulty
        likes
        dislikes
        isLiked
        similarQuestions
        exampleTestcases
        contributors {
            username
            profileUrl
            avatarUrl
        }
        topicTags {
            name
            slug
            translatedName
        }
        companyTagStats
        codeSnippets {
            lang
            langSlug
            code
        }
        stats
        hints
        solution {
            id
            canSeeDetail
            paidOnly
            hasVideoSolution
            paidOnlyVideo
        }
        status
        sampleTestCase
        metaData
        judgerAvailable
        judgeType
        mysqlSchemas
        enableRunCode
        enableTestMode
        enableDebugger
        envInfo
        libraryUrl
        adminUrl
        challengeQuestion {
            id
            date
            incompleteChallengeCount
            streakCount
            type
        }
        note
    }
}`;

export const ProblemList = `#graphql
    query getProblems($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
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
}`;

export const OfficialSolution = `
    query OfficialSolution($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        solution {
          id
          title
          content
          contentTypeId
          paidOnly
          hasVideoSolution
          paidOnlyVideo
          canSeeDetail
          rating {
            count
            average
            userRating {
              score
            }
          }
          topic {
            id
            commentCount
            topLevelCommentCount
            viewCount
            subscribed
            solutionTags {
              name
              slug
            }
            post {
              id
              status
              creationDate
              author {
                username
                isActive
                profile {
                  userAvatar
                  reputation
                }
              }
            }
          }
        }
      }
    }
`;

// ==================== Contests Queries ====================
export const AllContests = `
 query allContests {
    allContests {
        title
        titleSlug
        startTime
        duration
        originStartTime
        isVirtual
        containsPremium
        }
}
`;

// ==================== Discussion Queries ====================
export const TrendingDiscuss = `
    query trendingDiscuss($first: Int!) {
        cachedTrendingCategoryTopics(first: $first) {
            id
            title
            post {
                id
                creationDate
                contentPreview
                author {
                    username
                    isActive
                    profile {
                        userAvatar
                    }
                }
            }
        }
    }
`;

export const DiscussTopic = `
    query DiscussTopic($topicId: Int!) {
        topic(id: $topicId) {
            id
            viewCount
            topLevelCommentCount
            subscribed
            title
            pinned
            tags
            hideFromTrending
            post {
                ...DiscussPost
            }
        }
    }

    fragment DiscussPost on PostNode {
        id
        voteCount
        voteStatus
        content
        updationDate
        creationDate
        status
        isHidden
        coinRewards {
            ...CoinReward
        }
        author {
            isDiscussAdmin
            isDiscussStaff
            username
            nameColor
            activeBadge {
                displayName
                icon
            }
            profile {
                userAvatar
                reputation
            }
            isActive
        }
        authorIsModerator
        isOwnPost
    }

    fragment CoinReward on ScoreNode {
        id
        score
        description
        date
    }
`;

export const DiscussComments = `
    query discussComments($topicId: Int!, $orderBy: String = "newest_to_oldest", $pageNo: Int = 1, $numPerPage: Int = 10) {
        topicComments(topicId: $topicId, orderBy: $orderBy, pageNo: $pageNo, numPerPage: $numPerPage) {
            data {
                id
                pinned
                pinnedBy {
                    username
                }
                post {
                    ...DiscussPost
                }
                numChildren
            }
        }
    }

    fragment DiscussPost on PostNode {
        id
        voteCount
        voteStatus
        content
        updationDate
        creationDate
        status
        isHidden
        coinRewards {
            ...CoinReward
        }
        author {
            isDiscussAdmin
            isDiscussStaff
            username
            nameColor
            activeBadge {
                displayName
                icon
            }
            profile {
                userAvatar
                reputation
            }
            isActive
        }
        authorIsModerator
        isOwnPost
    }

    fragment CoinReward on ScoreNode {
        id
        score
        description
        date
    }
`;
