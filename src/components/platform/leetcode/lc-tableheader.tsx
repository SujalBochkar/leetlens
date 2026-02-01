import { LCSortConfig } from '@/types/type';
import LcSortButton from './lc-sortbutton';

interface TableHeaderProps {
	sortConfig: LCSortConfig;
	onSort: (key: LCSortConfig['key']) => void;
}

export default function LcTableHeader({ sortConfig, onSort }: TableHeaderProps) {
	return (
		<thead>
			<tr className="border-b border-border-primary bg-surface-secondary">
				<th className="h-12 w-[60px] px-4 text-left align-middle font-medium text-text-tertiary">
					Status
				</th>
				<th className="h-12 w-[60px] px-4 text-left align-middle font-medium text-text-tertiary">
					<LcSortButton
						label="#"
						sortKey="questionNumber"
						currentSort={sortConfig}
						onSort={onSort}
					/>
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-text-tertiary">
					<LcSortButton label="Title" sortKey="title" currentSort={sortConfig} onSort={onSort} />
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-text-tertiary">Topic</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-text-tertiary">
					<LcSortButton
						label="Difficulty"
						sortKey="difficulty"
						currentSort={sortConfig}
						onSort={onSort}
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					<LcSortButton
						label="Acceptance"
						sortKey="acceptance"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					<LcSortButton
						label="Companies"
						sortKey="companiesCount"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					Solution
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					AI Help
				</th>
			</tr>
		</thead>
	);
}
