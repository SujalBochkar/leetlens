import { LCSortConfig } from '@/types/type';
import LcSortButton from './lc-sortbutton';

interface TableHeaderProps {
	sortConfig: LCSortConfig;
	onSort: (key: LCSortConfig['key']) => void;
}

export default function LcTableHeader({ sortConfig, onSort }: TableHeaderProps) {
	return (
		<thead>
			<tr className="border-b border-zinc-800">
				<th className="h-12 w-[60px] px-4 text-left align-middle font-medium text-zinc-400">
					Status
				</th>
				<th className="h-12 w-[60px] px-4 text-left align-middle font-medium text-zinc-400">
					<LcSortButton label="#" sortKey="id" currentSort={sortConfig} onSort={onSort} />
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400">
					<LcSortButton label="Title" sortKey="title" currentSort={sortConfig} onSort={onSort} />
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400">
					<LcSortButton
						label="Category"
						sortKey="category"
						currentSort={sortConfig}
						onSort={onSort}
					/>
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-zinc-400">
					<LcSortButton
						label="Difficulty"
						sortKey="difficulty"
						currentSort={sortConfig}
						onSort={onSort}
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-zinc-400">
					<LcSortButton
						label="Acceptance"
						sortKey="acceptance"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-zinc-400">
					<LcSortButton
						label="Companies"
						sortKey="companiesCount"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-zinc-400">
					<LcSortButton
						label="Submissions"
						sortKey="totalSubmitted"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-zinc-400">
					<LcSortButton
						label="Accepted"
						sortKey="totalAccepted"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-zinc-400">Hints</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-zinc-400">AI Help</th>
			</tr>
		</thead>
	);
}
