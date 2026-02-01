'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
	ArrowLeft,
	Building2,
	Loader2,
	ExternalLink,
	ArrowUpDown,
	ArrowUp,
	ArrowDown,
} from 'lucide-react';
import NavBar from '@/components/dashboard/navbar';
import LcDifficultyBadge from '../lc-difficultybadge';
import { LCCompanyProblemsResponse, LCCompanyProblem } from '@/types/type';
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

interface CompanyProblemsProps {
	slug: string;
}

type SortField = 'questionNumber' | 'title' | 'difficulty' | 'frequency' | 'acceptanceRate';
type SortOrder = 'asc' | 'desc';

export default function CompanyProblems({ slug }: CompanyProblemsProps) {
	const [data, setData] = useState<LCCompanyProblemsResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(20);
	const [difficulty, setDifficulty] = useState<string>('all');
	const [timeFrame, setTimeFrame] = useState<string>('all');
	const [sortBy, setSortBy] = useState<SortField>('frequency');
	const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

	useEffect(() => {
		const fetchCompanyProblems = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const params = new URLSearchParams({
					page: page.toString(),
					pageSize: pageSize.toString(),
					timeFrame,
					sortBy,
					sortOrder,
				});
				if (difficulty !== 'all') {
					params.append('difficulty', difficulty);
				}

				const { data } = await axios.get<LCCompanyProblemsResponse>(
					`/api/leetcode/companies/${slug}/problems?${params.toString()}`,
				);
				setData(data);
			} catch (err: any) {
				setError(err.response?.data?.error || 'Failed to fetch company problems');
			} finally {
				setIsLoading(false);
			}
		};
		fetchCompanyProblems();
	}, [slug, page, pageSize, difficulty, timeFrame, sortBy, sortOrder]);

	const handleSort = (field: SortField) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(field);
			setSortOrder(field === 'frequency' ? 'desc' : 'asc');
		}
		setPage(1);
	};

	const SortIcon = ({ field }: { field: SortField }) => {
		if (sortBy !== field) {
			return <ArrowUpDown className="w-4 h-4 text-text-disabled" />;
		}
		return sortOrder === 'asc' ? (
			<ArrowUp className="w-4 h-4 text-brand-accent" />
		) : (
			<ArrowDown className="w-4 h-4 text-brand-accent" />
		);
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= (data?.totalPages || 1)) {
			setPage(newPage);
		}
	};

	const getPageNumbers = () => {
		if (!data) return [];
		const pages: (number | null)[] = [];
		const totalPages = data.totalPages;
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (page <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);
				pages.push(null);
				pages.push(totalPages);
			} else if (page >= totalPages - 2) {
				pages.push(1);
				pages.push(null);
				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push(null);
				for (let i = page - 1; i <= page + 1; i++) pages.push(i);
				pages.push(null);
				pages.push(totalPages);
			}
		}
		return pages;
	};

	const getFrequencyValue = (problem: LCCompanyProblem) => {
		const key = timeFrame as keyof typeof problem.frequency;
		return problem.frequency[key] || problem.frequency.all;
	};

	return (
		<div className="min-h-screen bg-surface-page">
			<NavBar />

			<div className="max-w-7xl mx-auto px-4 py-6">
				{/* Back Button */}
				<Link
					href="/platform/leetcode"
					className="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary mb-6 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" />
					Back to Problems
				</Link>

				{isLoading && !data ? (
					<div className="flex items-center justify-center py-20">
						<Loader2 className="w-8 h-8 animate-spin text-text-tertiary" />
					</div>
				) : error ? (
					<div className="text-center py-20">
						<h2 className="text-xl font-medium text-text-secondary">{error}</h2>
						<Link
							href="/platform/leetcode"
							className="mt-4 inline-block text-text-link hover:underline"
						>
							Go back to problems
						</Link>
					</div>
				) : data ? (
					<>
						{/* Company Header */}
						<div className="mb-8">
							<div className="flex items-center gap-4 mb-4">
								<div className="p-3 rounded-xl bg-surface-secondary border border-border-primary">
									<Building2 className="w-8 h-8 text-text-tertiary" />
								</div>
								<div>
									<h1 className="text-2xl font-bold text-text-primary">{data.company.name}</h1>
									<p className="text-text-tertiary">
										{data.stats.total} problems asked in interviews
									</p>
								</div>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
								<div className="p-4 rounded-xl bg-surface-secondary border border-border-primary">
									<div className="text-2xl font-bold text-text-primary">{data.stats.total}</div>
									<div className="text-sm text-text-tertiary">Total Problems</div>
								</div>
								<div className="p-4 rounded-xl bg-surface-secondary border border-border-primary">
									<div className="text-2xl font-bold text-difficulty-easy">{data.stats.easy}</div>
									<div className="text-sm text-text-tertiary">Easy</div>
								</div>
								<div className="p-4 rounded-xl bg-surface-secondary border border-border-primary">
									<div className="text-2xl font-bold text-difficulty-medium">
										{data.stats.medium}
									</div>
									<div className="text-sm text-text-tertiary">Medium</div>
								</div>
								<div className="p-4 rounded-xl bg-surface-secondary border border-border-primary">
									<div className="text-2xl font-bold text-difficulty-hard">{data.stats.hard}</div>
									<div className="text-sm text-text-tertiary">Hard</div>
								</div>
							</div>
						</div>

						{/* Filters */}
						<div className="flex flex-wrap gap-4 mb-6">
							<Select value={difficulty} onValueChange={setDifficulty}>
								<SelectTrigger className="w-[140px] bg-surface-secondary border-border-primary">
									<SelectValue placeholder="Difficulty" />
								</SelectTrigger>
								<SelectContent className="bg-surface-secondary border-border-primary">
									<SelectItem value="all">All Difficulty</SelectItem>
									<SelectItem value="Easy">Easy</SelectItem>
									<SelectItem value="Medium">Medium</SelectItem>
									<SelectItem value="Hard">Hard</SelectItem>
								</SelectContent>
							</Select>

							<Select value={timeFrame} onValueChange={setTimeFrame}>
								<SelectTrigger className="w-[160px] bg-surface-secondary border-border-primary">
									<SelectValue placeholder="Time Frame" />
								</SelectTrigger>
								<SelectContent className="bg-surface-secondary border-border-primary">
									<SelectItem value="30days">Last 30 Days</SelectItem>
									<SelectItem value="3months">Last 3 Months</SelectItem>
									<SelectItem value="6months">Last 6 Months</SelectItem>
									<SelectItem value="all">All Time</SelectItem>
								</SelectContent>
							</Select>

							<Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
								<SelectTrigger className="w-[120px] bg-surface-secondary border-border-primary">
									<SelectValue placeholder="Per page" />
								</SelectTrigger>
								<SelectContent className="bg-surface-secondary border-border-primary">
									<SelectItem value="20">20 / page</SelectItem>
									<SelectItem value="50">50 / page</SelectItem>
									<SelectItem value="100">100 / page</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Problems Table */}
						<div className="rounded-xl border border-border-primary bg-surface-page overflow-hidden">
							<table className="w-full">
								<thead>
									<tr className="border-b border-border-primary bg-surface-secondary">
										<th
											className="p-4 text-left text-sm font-medium text-text-tertiary cursor-pointer hover:text-text-primary transition-colors"
											onClick={() => handleSort('questionNumber')}
										>
											<div className="flex items-center gap-2">
												#
												<SortIcon field="questionNumber" />
											</div>
										</th>
										<th
											className="p-4 text-left text-sm font-medium text-text-tertiary cursor-pointer hover:text-text-primary transition-colors"
											onClick={() => handleSort('title')}
										>
											<div className="flex items-center gap-2">
												Title
												<SortIcon field="title" />
											</div>
										</th>
										<th
											className="p-4 text-left text-sm font-medium text-text-tertiary cursor-pointer hover:text-text-primary transition-colors"
											onClick={() => handleSort('difficulty')}
										>
											<div className="flex items-center gap-2">
												Difficulty
												<SortIcon field="difficulty" />
											</div>
										</th>
										<th
											className="p-4 text-left text-sm font-medium text-text-tertiary cursor-pointer hover:text-text-primary transition-colors"
											onClick={() => handleSort('acceptanceRate')}
										>
											<div className="flex items-center gap-2">
												Acceptance
												<SortIcon field="acceptanceRate" />
											</div>
										</th>
										<th
											className="p-4 text-left text-sm font-medium text-text-tertiary cursor-pointer hover:text-text-primary transition-colors"
											onClick={() => handleSort('frequency')}
										>
											<div className="flex items-center gap-2">
												Frequency
												<SortIcon field="frequency" />
											</div>
										</th>
										<th className="p-4 text-center text-sm font-medium text-text-tertiary">Link</th>
									</tr>
								</thead>
								<tbody>
									{isLoading ? (
										<tr>
											<td colSpan={6} className="p-8 text-center">
												<Loader2 className="w-6 h-6 animate-spin text-text-tertiary mx-auto" />
											</td>
										</tr>
									) : (
										data.problems.map((problem) => (
											<tr
												key={problem.id}
												className="border-b border-border-primary hover:bg-surface-hover transition-colors"
											>
												<td className="p-4 text-text-tertiary">{problem.questionNumber}</td>
												<td className="p-4">
													<span className="text-text-primary">{problem.title}</span>
													{problem.isPaidOnly && (
														<span className="ml-2 text-xs text-status-warning">🔒</span>
													)}
												</td>
												<td className="p-4">
													<LcDifficultyBadge difficulty={problem.difficulty} />
												</td>
												<td className="p-4 text-text-tertiary">
													{problem.acceptanceRate?.toFixed(1)}%
												</td>
												<td className="p-4">
													<div className="flex items-center gap-2">
														<div className="w-20 h-2 rounded-full bg-surface-tertiary overflow-hidden">
															<div
																className="h-full bg-brand-accent rounded-full"
																style={{
																	width: `${Math.min(getFrequencyValue(problem), 100)}%`,
																}}
															/>
														</div>
														<span className="text-xs text-text-tertiary">
															{getFrequencyValue(problem)}
														</span>
													</div>
												</td>
												<td className="p-4 text-center">
													<a
														href={`https://leetcode.com/problems/${problem.titleSlug}/`}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors"
													>
														<ExternalLink className="w-4 h-4" />
													</a>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>

						{/* Pagination */}
						<div className="flex items-center justify-between mt-6">
							<div className="text-sm text-text-tertiary">
								Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data.total)} of{' '}
								{data.total} problems
							</div>

							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											onClick={() => handlePageChange(page - 1)}
											className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
										/>
									</PaginationItem>

									{getPageNumbers().map((p, index) => (
										<PaginationItem key={index}>
											{p === null ? (
												<PaginationEllipsis />
											) : (
												<PaginationLink
													onClick={() => handlePageChange(p)}
													isActive={p === page}
													className="cursor-pointer"
												>
													{p}
												</PaginationLink>
											)}
										</PaginationItem>
									))}

									<PaginationItem>
										<PaginationNext
											onClick={() => handlePageChange(page + 1)}
											className={
												page === data.totalPages
													? 'pointer-events-none opacity-50'
													: 'cursor-pointer'
											}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}
