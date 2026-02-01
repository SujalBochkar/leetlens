import CompanyProblems from '@/components/platform/leetcode/company/company-problems';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function CompanyProblemsPage({ params }: PageProps) {
	const { slug } = await params;
	return <CompanyProblems slug={slug} />;
}
