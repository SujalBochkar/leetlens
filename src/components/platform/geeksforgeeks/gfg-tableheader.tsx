'use client';

import { GFGSortConfig } from '@/types/type';
import GfgSortButton from './gfg-sortbutton';

interface TableHeaderProps {
	sortConfig: GFGSortConfig;
	onSort: (key: GFGSortConfig['key']) => void;
}

export default function GfgTableHeader({ sortConfig, onSort }: TableHeaderProps) {
	return (
		<thead>
			<tr className="border-b border-border-primary bg-surface-secondary">
				<th className="h-12 w-[60px] px-4 text-left align-middle font-medium text-text-tertiary">
					Status
				</th>
				<th className="h-12 w-[60px] px-4 text-left align-middle font-medium text-text-tertiary">
					<GfgSortButton label="#" sortKey="id" currentSort={sortConfig} onSort={onSort} />
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-text-tertiary">
					<GfgSortButton label="Title" sortKey="title" currentSort={sortConfig} onSort={onSort} />
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-text-tertiary">
					<GfgSortButton
						label="Category"
						sortKey="category"
						currentSort={sortConfig}
						onSort={onSort}
					/>
				</th>
				<th className="h-12 px-4 text-left align-middle font-medium text-text-tertiary">
					<GfgSortButton
						label="Difficulty"
						sortKey="difficulty"
						currentSort={sortConfig}
						onSort={onSort}
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					<GfgSortButton
						label="Companies"
						sortKey="companiesCount"
						currentSort={sortConfig}
						onSort={onSort}
						className="justify-center mx-auto"
					/>
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					Solutions
				</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">Hints</th>
				<th className="h-12 px-4 text-center align-middle font-medium text-text-tertiary">
					AI Help
				</th>
			</tr>
		</thead>
	);
}
