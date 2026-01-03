'use client';

import { useState } from 'react';
import { CnTableHeader } from './cn-tableheader';
import { CnTableRow } from './cn-tablerow';
import { CnPagination } from './cn-pagination';
// import { TableHeader } from "./cn-tableheader";
// import { Pagination } from "./cn-pagination";
// import { TableRow } from "./cn-tablerow";

interface Problem {
	id: number;
	title: string;
	difficulty: 'Easy' | 'Medium' | 'Hard';
	avgTimeToSolve: string;
	hasSolution: boolean;
	isComplete?: boolean;
}

type SortField = 'title' | 'difficulty' | 'avgTimeToSolve';
type SortOrder = 'asc' | 'desc';

export default function CodingNinjas() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);
	const [searchQuery, setSearchQuery] = useState('');
	const [sortConfig, setSortConfig] = useState<{
		field: SortField;
		order: SortOrder;
	} | null>(null);

	const problems: Problem[] = [
		{
			id: 2415,
			title: 'Reverse Odd Levels of Binary Tree',
			difficulty: 'Medium',
			avgTimeToSolve: '45 min',
			hasSolution: true,
			isComplete: true,
		},
		{
			id: 1,
			title: 'Two Sum',
			difficulty: 'Easy',
			avgTimeToSolve: '30 min',
			hasSolution: true,
		},
		// Add more problems...
	];

	const sortProblems = (problems: Problem[]) => {
		if (!sortConfig) return problems;

		return [...problems].sort((a, b) => {
			if (sortConfig.field === 'title') {
				return sortConfig.order === 'asc'
					? a.title.localeCompare(b.title)
					: b.title.localeCompare(a.title);
			}
			if (sortConfig.field === 'difficulty') {
				const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
				return sortConfig.order === 'asc'
					? difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
					: difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
			}
			if (sortConfig.field === 'avgTimeToSolve') {
				const aValue = parseInt(a.avgTimeToSolve);
				const bValue = parseInt(b.avgTimeToSolve);
				return sortConfig.order === 'asc' ? aValue - bValue : bValue - aValue;
			}
			return 0;
		});
	};

	const handleSort = (field: SortField) => {
		setSortConfig((currentConfig) => {
			if (currentConfig?.field === field) {
				return {
					field,
					order: currentConfig.order === 'asc' ? 'desc' : 'asc',
				};
			}
			return { field, order: 'asc' };
		});
	};

	const sortedProblems = sortProblems(problems);

	// Calculate total pages
	const totalPages = Math.ceil(problems.length / itemsPerPage);

	return (
		<div>
			<CnTableHeader onSearch={setSearchQuery} />

			<div className="-mx-4 md:mx-0">
				<div role="table" className="border-spacing-0 overflow-auto">
					<div className="inline-block min-w-full">
						<div className="border-b border-divider-border-2 dark:border-dark-divider-border-2">
							{/* Table header */}
							<div role="row" className="flex">
								<div role="columnheader" className="mx-2 py-[11px] w-[52px]">
									Status
								</div>
								<div
									role="columnheader"
									className="mx-2 py-[11px] w-[600px] cursor-pointer"
									onClick={() => handleSort('title')}
								>
									Title
									{sortConfig?.field === 'title' && (
										<span className="ml-1">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
									)}
								</div>
								<div
									role="columnheader"
									className="mx-2 py-[11px] w-[84px] cursor-pointer"
									onClick={() => handleSort('difficulty')}
								>
									Difficulty
									{sortConfig?.field === 'difficulty' && (
										<span className="ml-1">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
									)}
								</div>
								<div
									role="columnheader"
									className="mx-2 py-[11px] w-[120px] cursor-pointer"
									onClick={() => handleSort('avgTimeToSolve')}
								>
									Avg Time to Solve
									{sortConfig?.field === 'avgTimeToSolve' && (
										<span className="ml-1">{sortConfig.order === 'asc' ? '↑' : '↓'}</span>
									)}
								</div>
							</div>
						</div>
						{/* Table body */}
						<div role="rowgroup">
							{sortedProblems.map((problem) => (
								<CnTableRow key={problem.id} problem={problem} />
							))}
						</div>
					</div>
				</div>
			</div>

			<CnPagination
				currentPage={currentPage}
				totalPages={totalPages}
				itemsPerPage={itemsPerPage}
				onPageChange={setCurrentPage}
				onItemsPerPageChange={setItemsPerPage}
			/>
		</div>
	);
}
