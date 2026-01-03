import { useEffect, useState } from 'react';
import LcTableHeader from './lc-tableheader';
import LcProblemRow from './lc-problemrow';
import { LCProblem, LCSortConfig } from '@/types/type';
import axios from 'axios';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function LcTable() {
	const [sortConfig, setSortConfig] = useState<LCSortConfig>({
		key: null,
		direction: null,
	});

	const [problems, setProblems] = useState<LCProblem[]>([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [pageSize, setPageSize] = useState(20); // Default to 20 items per page

	useEffect(() => {
		const fetchProblems = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get(
					`api/leetcode/problems/page/${pageNumber}?pageSize=${pageSize}`,
				);
				setProblems(data.problems);
				setTotalPages(Math.ceil(data.total / pageSize));
			} catch (error) {
				console.error('Error fetching problems:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProblems();
	}, [pageNumber, pageSize]);

	const problem: LCProblem[] = [
		{
			id: '1',
			isCompleted: true,
			title: 'Two Sum',
			difficulty: 'Easy',
			category: 'Array',
			statistics: {
				totalAccepted: 4859632,
				totalSubmitted: 9876543,
			},
			companies: [
				{ name: 'Amazon', logo: '/assets/company-logos/amazon.png' },
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Microsoft', logo: '/assets/company-logos/microsoft.png' },
				{ name: 'Facebook', logo: '/assets/company-logos/facebook.png' },
				{ name: 'Apple', logo: '/assets/company-logos/apple.png' },
			],
		},
		{
			id: '2',
			isCompleted: false,
			title: 'Add Two Numbers',
			difficulty: 'Medium',
			category: 'Linked List',
			statistics: {
				totalAccepted: 2859632,
				totalSubmitted: 5876543,
			},
			companies: [
				{ name: 'Microsoft', logo: '/assets/company-logos/microsoft.png' },
				{ name: 'Apple', logo: '/assets/company-logos/apple.png' },
			],
		},
		{
			id: '3',
			isCompleted: false,
			title: 'Median of Two Sorted Arrays',
			difficulty: 'Hard',
			category: 'Binary Search',
			statistics: {
				totalAccepted: 859632,
				totalSubmitted: 2876543,
			},
			companies: [
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Amazon', logo: '/assets/company-logos/amazon.png' },
				{ name: 'Facebook', logo: '/assets/company-logos/facebook.png' },
			],
		},
		{
			id: '4',
			isCompleted: true,
			title: 'Longest Substring Without Repeating Characters',
			difficulty: 'Medium',
			category: 'String',
			statistics: {
				totalAccepted: 1859632,
				totalSubmitted: 3876543,
			},
			companies: [
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Facebook', logo: '/assets/company-logos/facebook.png' },
			],
		},
		{
			id: '5',
			isCompleted: false,
			title: 'Longest Palindromic Substring',
			difficulty: 'Medium',
			category: 'String',
			statistics: {
				totalAccepted: 159632,
				totalSubmitted: 287654,
			},
			companies: [
				{ name: 'Amazon', logo: '/assets/company-logos/amazon.png' },
				{ name: 'Microsoft', logo: '/assets/company-logos/microsoft.png' },
			],
		},
		{
			id: '6',
			isCompleted: true,
			title: 'Valid Parentheses',
			difficulty: 'Easy',
			category: 'Stack',
			statistics: {
				totalAccepted: 3859632,
				totalSubmitted: 4876543,
			},
			companies: [
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Apple', logo: '/assets/company-logos/apple.png' },
			],
		},
		{
			id: '7',
			isCompleted: false,
			title: 'Merge Two Sorted Lists',
			difficulty: 'Easy',
			category: 'Linked List',
			statistics: {
				totalAccepted: 2859632,
				totalSubmitted: 3876543,
			},
			companies: [
				{ name: 'Facebook', logo: '/assets/company-logos/facebook.png' },
				{ name: 'Amazon', logo: '/assets/company-logos/amazon.png' },
			],
		},
		{
			id: '8',
			isCompleted: true,
			title: 'Search in Rotated Sorted Array',
			difficulty: 'Medium',
			category: 'Binary Search',
			statistics: {
				totalAccepted: 159632,
				totalSubmitted: 287654,
			},
			companies: [
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Microsoft', logo: '/assets/company-logos/microsoft.png' },
			],
		},
		{
			id: '9',
			isCompleted: false,
			title: 'Container With Most Water',
			difficulty: 'Medium',
			category: 'Two Pointers',
			statistics: {
				totalAccepted: 859632,
				totalSubmitted: 1876543,
			},
			companies: [
				{ name: 'Amazon', logo: '/assets/company-logos/amazon.png' },
				{ name: 'Apple', logo: '/assets/company-logos/apple.png' },
			],
		},
		{
			id: '10',
			isCompleted: true,
			title: '3Sum',
			difficulty: 'Medium',
			category: 'Array',
			statistics: {
				totalAccepted: 2859632,
				totalSubmitted: 4876543,
			},
			companies: [
				{ name: 'Google', logo: '/assets/company-logos/google.png' },
				{ name: 'Facebook', logo: '/assets/company-logos/facebook.png' },
			],
		},
	];

	const getSortedProblems = () => {
		if (!sortConfig.key) return problem;

		return [...problem].sort((a, b) => {
			if (sortConfig.key === 'acceptance') {
				const aRate = Number(
					((a.statistics.totalAccepted / a.statistics.totalSubmitted) * 100).toFixed(1),
				);
				const bRate = Number(
					((b.statistics.totalAccepted / b.statistics.totalSubmitted) * 100).toFixed(1),
				);
				return sortConfig.direction === 'asc' ? aRate - bRate : bRate - aRate;
			}
			if (sortConfig.key === 'totalAccepted') {
				return sortConfig.direction === 'asc'
					? a.statistics.totalAccepted - b.statistics.totalAccepted
					: b.statistics.totalAccepted - a.statistics.totalAccepted;
			}
			if (sortConfig.key === 'totalSubmitted') {
				return sortConfig.direction === 'asc'
					? a.statistics.totalSubmitted - b.statistics.totalSubmitted
					: b.statistics.totalSubmitted - a.statistics.totalSubmitted;
			}
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
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'asc' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'asc' ? 1 : -1;
				}
			}
			return 0;
		});
	};

	const requestSort = (key: LCSortConfig['key']) => {
		let direction: LCSortConfig['direction'] = 'asc';

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

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPageNumber(newPage);
		}
	};

	// Function to generate page numbers array
	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (pageNumber <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i);
				}
				pages.push(null); // For ellipsis
				pages.push(totalPages);
			} else if (pageNumber >= totalPages - 2) {
				pages.push(1);
				pages.push(null); // For ellipsis
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push(1);
				pages.push(null); // For ellipsis
				for (let i = pageNumber - 1; i <= pageNumber + 1; i++) {
					pages.push(i);
				}
				pages.push(null); // For ellipsis
				pages.push(totalPages);
			}
		}
		return pages;
	};

	// Add handler for page size change
	const handlePageSizeChange = (value: string) => {
		setPageSize(Number(value));
		setPageNumber(1); // Reset to first page when changing page size
	};

	return (
		<div className="w-full rounded-xl border border-zinc-800 bg-zinc-950">
			<div className="relative w-full overflow-auto">
				<table className="w-full caption-bottom text-sm">
					<LcTableHeader sortConfig={sortConfig} onSort={requestSort} />
					<tbody className="[&_tr:last-child]:border-0">
						{isLoading ? (
							<tr>
								<td colSpan={7} className="text-center py-4">
									<div className="flex items-center justify-center space-x-2">
										<div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
										<span className="text-gray-400">Loading problems...</span>
									</div>
								</td>
							</tr>
						) : (
							getSortedProblems().map((problem) => (
								<LcProblemRow key={problem.id} problem={problem} />
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Update Pagination section */}
			<div className="py-4 border-t border-zinc-800">
				<div className="flex items-center justify-between px-4">
					<div className="flex items-center space-x-2 text-sm text-gray-400">
						<span>Show</span>
						<Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
							<SelectTrigger className="w-[100px] h-8 bg-zinc-900 border-zinc-700">
								<SelectValue placeholder="20" />
							</SelectTrigger>
							<SelectContent className="bg-zinc-900 border-zinc-700">
								<SelectItem value="20">20</SelectItem>
								<SelectItem value="50">50</SelectItem>
								<SelectItem value="100">100</SelectItem>
							</SelectContent>
						</Select>
						<span>per page</span>
					</div>

					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									onClick={() => handlePageChange(pageNumber - 1)}
									className={`${
										pageNumber === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
									}`}
								/>
							</PaginationItem>

							{getPageNumbers().map((page, index) => (
								<PaginationItem key={index}>
									{page === null ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											onClick={() => handlePageChange(page)}
											isActive={page === pageNumber}
											className={`${
												page === pageNumber ? 'bg-primary text-primary-foreground' : ''
											} cursor-pointer`}
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									onClick={() => handlePageChange(pageNumber + 1)}
									className={`${
										pageNumber === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
									}`}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>

					<div className="text-sm text-gray-400">
						Showing {(pageNumber - 1) * pageSize + 1} to{''}
						{Math.min(pageNumber * pageSize, problems.length)} of{''}
						{problems.length} problems
					</div>
				</div>
			</div>
		</div>
	);
}
