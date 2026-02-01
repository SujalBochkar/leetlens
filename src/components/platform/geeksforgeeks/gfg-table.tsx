import { useState } from 'react';
import { GFGProblem, GFGSortConfig } from '@/types/type';
import GfgTableHeader from './gfg-tableheader';
import GfgProblemRow from './gfg-problemrow';

export default function GfgTable() {
	const [sortConfig, setSortConfig] = useState<GFGSortConfig>({
		key: null,
		direction: null,
	});

	const problems: GFGProblem[] = [
		{
			id: '1',
			isCompleted: false,
			title: 'Maximum Subarray Sum',
			difficulty: 'Medium',
			category: 'Arrays',
			companies: [
				{ name: 'Amazon', logo: '/assets/company-logos/amazon.png' },
				{ name: 'Microsoft', logo: '/assets/company-logos/microsoft.png' },
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Facebook', logo: '/assets/company-logos/facebook.png' },
			],
			languages: {
				cpp: {
					main_function_code: '// C++ code...',
					user_function_code: '// User function code...',
				},
				java: {
					main_function_code: '// Java code...',
					user_function_code: '// User function code...',
				},
				python: {
					main_function_code: '# Python code...',
					user_function_code: '# User function code...',
				},
				javascript: {
					main_function_code: '// JavaScript code...',
					user_function_code: '// User function code...',
				},
			},
			question_content: 'Given an array arr[], find the maximum sum of a subarray...',
			question_answer1:
				'The idea is to maintain a variable max_ending_here that stores the maximum sum...',
			question_answer2: 'Another approach would be to use divide and conquer...',
		},
	];

	const getSortedProblems = () => {
		if (!sortConfig.key) return problems;

		return [...problems].sort((a, b) => {
			if (sortConfig.key === 'companiesCount') {
				return sortConfig.direction === 'asc'
					? a.companies.length - b.companies.length
					: b.companies.length - a.companies.length;
			}

			if (
				sortConfig.key &&
				typeof a[sortConfig.key] !== 'undefined' &&
				typeof b[sortConfig.key] !== 'undefined'
			) {
				const aValue = a[sortConfig.key as keyof Omit<GFGProblem, 'companies' | 'languages'>];
				const bValue = b[sortConfig.key as keyof Omit<GFGProblem, 'companies' | 'languages'>];

				if (aValue && bValue) {
					if (aValue < bValue) {
						return sortConfig.direction === 'asc' ? -1 : 1;
					}
					if (aValue > bValue) {
						return sortConfig.direction === 'asc' ? 1 : -1;
					}
				}
			}
			return 0;
		});
	};

	const requestSort = (key: GFGSortConfig['key']) => {
		let direction: GFGSortConfig['direction'] = 'asc';

		if (sortConfig.key === key) {
			if (sortConfig.direction === null) {
				direction = 'desc';
			} else if (sortConfig.direction === 'desc') {
				direction = 'asc';
			} else {
				direction = null;
			}
		}

		setSortConfig({ key, direction });
	};

	return (
		<div className="max-w-[100rem] mx-auto">
			<div className="rounded-xl border border-border-primary bg-surface-page">
				<div className="relative w-full overflow-auto">
					<table className="w-full caption-bottom text-sm">
						<GfgTableHeader sortConfig={sortConfig} onSort={requestSort} />
						<tbody>
							{getSortedProblems().map((problem) => (
								<GfgProblemRow key={problem.id} problem={problem} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
