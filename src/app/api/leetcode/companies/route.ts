import { NextRequest, NextResponse } from 'next/server';
import db from '@/server/db';

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const search = searchParams.get('search');

		// Build where clause
		const where: any = {};
		if (search) {
			where.name = { contains: search, mode: 'insensitive' };
		}

		// Fetch companies with problem counts
		const companies = await db.company.findMany({
			where,
			select: {
				id: true,
				name: true,
				slug: true,
				logoUrl: true,
				_count: {
					select: {
						problems: true,
					},
				},
			},
			orderBy: {
				problems: {
					_count: 'desc',
				},
			},
		});

		// Transform data
		const transformedCompanies = companies.map((company: any) => ({
			id: company.id,
			name: company.name,
			slug: company.slug,
			logoUrl: company.logoUrl,
			problemCount: company._count.problems,
		}));

		return NextResponse.json({
			companies: transformedCompanies,
			total: transformedCompanies.length,
		});
	} catch (error: any) {
		console.error('Error fetching companies:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
