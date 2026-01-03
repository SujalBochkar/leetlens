import NavBar from '@/components/dashboard/navbar';
import CompanyCard from '@/components/platform/leetcode/company/lc-company-card';
import LcCompanyTable from '@/components/platform/leetcode/company/lc-company-table';

export default function LeetCodeCompany() {
	const companyData = {
		name: 'Meta',
		imageUrl: '',
		questionCount: 957,
		easyCount: 300,
		mediumCount: 400,
		hardCount: 257,
		lastUpdated: '6 hours ago',
	};

	return (
		<>
			<NavBar />
			<main className="container mx-auto px-4 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="w-full lg:w-[300px]">
						<CompanyCard {...companyData} />
					</div>
					<div className="flex-1">
						<LcCompanyTable />
					</div>
				</div>
			</main>
		</>
	);
}
