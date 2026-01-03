import { NextResponse } from 'next/server';
// import { FetchProblems } from '@/server/modules/leetcode/controllers/fetch-problems';
// import { ProblemList } from '@/server/modules/leetcode/queries';

export async function POST(_request: Request) {
	try {
		// const _body = await request.json();
		// const { limit, skip, tags, difficulty } = body;

		// const data = await FetchProblems({ limit, skip, tags, difficulty }, ProblemList);

		return NextResponse.json({});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
