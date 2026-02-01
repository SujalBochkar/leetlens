'use client';

import { useEffect, useState } from 'react';
import LcTableHeader from './lc-tableheader';
import LcProblemRow from './lc-problemrow';
import { LCProblem, LCSortConfig, LCProblemsResponse } from '@/types/type';
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
	const [totalProblems, setTotalProblems] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [pageSize, setPageSize] = useState(20);

	useEffect(() => {
		const fetchProblems = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get<LCProblemsResponse>(
					`/api/leetcode/problems?page=${pageNumber}&pageSize=${pageSize}`,
				);
				setProblems(data.problems);
				setTotalPages(data.totalPages);
				setTotalProblems(data.total);
			} catch (error) {
				console.error('Error fetching problems:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProblems();
	}, [pageNumber, pageSize]);

	const getSortedProblems = () => {
		if (!sortConfig.key) return problems;

		return [...problems].sort((a, b) => {
			if (sortConfig.key === 'acceptance' || sortConfig.key === 'acceptanceRate') {
				const aRate = a.acceptanceRate || 0;
				const bRate = b.acceptanceRate || 0;
				return sortConfig.direction === 'asc' ? aRate - bRate : bRate - aRate;
			}
			if (sortConfig.key === 'companiesCount') {
				return sortConfig.direction === 'asc'
					? a.companies.length - b.companies.length
					: b.companies.length - a.companies.length;
			}
			if (sortConfig.key === 'difficulty') {
				const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
				const aOrder = diffOrder[a.difficulty as keyof typeof diffOrder] || 2;
				const bOrder = diffOrder[b.difficulty as keyof typeof diffOrder] || 2;
				return sortConfig.direction === 'asc' ? aOrder - bOrder : bOrder - aOrder;
			}
			if (sortConfig.key === 'questionNumber' || sortConfig.key === 'id') {
				const aNum = parseInt(a.questionNumber || '0');
				const bNum = parseInt(b.questionNumber || '0');
				return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
			}
			if (sortConfig.key === 'title') {
				return sortConfig.direction === 'asc'
					? a.title.localeCompare(b.title)
					: b.title.localeCompare(a.title);
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
		<div className="w-full rounded-xl border border-border-primary bg-surface-page">
			<div className="relative w-full overflow-auto">
				<table className="w-full caption-bottom text-sm">
					<LcTableHeader sortConfig={sortConfig} onSort={requestSort} />
					<tbody className="[&_tr:last-child]:border-0">
						{isLoading ? (
							<tr>
								<td colSpan={7} className="text-center py-4">
									<div className="flex items-center justify-center space-x-2">
										<div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
										<span className="text-text-tertiary">Loading problems...</span>
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
			<div className="py-4 border-t border-border-primary">
				<div className="flex items-center justify-between px-4">
					<div className="flex items-center space-x-2 text-sm text-text-tertiary">
						<span>Show</span>
						<Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
							<SelectTrigger className="w-[100px] h-8 bg-surface-secondary border-border-primary">
								<SelectValue placeholder="20" />
							</SelectTrigger>
							<SelectContent className="bg-surface-secondary border-border-primary">
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

					<div className="text-sm text-text-tertiary">
						Showing {(pageNumber - 1) * pageSize + 1} to{' '}
						{Math.min(pageNumber * pageSize, totalProblems)} of {totalProblems} problems
					</div>
				</div>
			</div>
		</div>
	);
}
