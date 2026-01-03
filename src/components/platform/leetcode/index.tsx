'use client';
import LCBanner from './lc-banner';
import CompaniesSearch from './lc-companysearch';
import ProblemTable from './lc-table';
import NavBar from '@/components/dashboard/navbar';

export default function Leetcode() {
	return (
		<div>
			<NavBar />
			<div className="my-6">
				<LCBanner />
			</div>
			<div className="max-w-[110rem] mx-auto">
				<main className="mx-auto px-4">
					<div className="flex gap-4 justify-between">
						<CompaniesSearch />
						<ProblemTable />
					</div>
				</main>
			</div>
		</div>
	);
}
