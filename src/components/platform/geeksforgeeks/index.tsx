'use client';
import NavBar from '@/components/dashboard/navbar';
import ProblemTable from './gfg-table';

export default function GeekForGeeks() {
	return (
		<div>
			<div>
				<NavBar />
			</div>
			<ProblemTable />
		</div>
	);
}
