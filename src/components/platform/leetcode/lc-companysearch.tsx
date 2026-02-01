'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchIcon, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { LCCompanyWithCount, LCCompaniesResponse } from '@/types/type';

export default function LcCompanySearch() {
	const [searchQuery, setSearchQuery] = useState('');
	const [companies, setCompanies] = useState<LCCompanyWithCount[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const companiesPerPage = 15;

	useEffect(() => {
		const fetchCompanies = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get<LCCompaniesResponse>('/api/leetcode/companies');
				setCompanies(data.companies);
			} catch (error) {
				console.error('Error fetching companies:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCompanies();
	}, []);

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Paginate filtered companies
	const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
	const paginatedCompanies = filteredCompanies.slice(
		currentPage * companiesPerPage,
		(currentPage + 1) * companiesPerPage,
	);

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(0, prev - 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
	};

	// Reset page when search changes
	useEffect(() => {
		setCurrentPage(0);
	}, [searchQuery]);

	return (
		<div className="w-[20rem] rounded-xl border border-border-primary bg-surface-page p-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-text-primary font-medium">Trending Companies</h2>
				<div className="flex gap-1">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 0}
						className="p-1 rounded hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronLeft className="h-4 w-4 text-text-tertiary" />
					</button>
					<button
						onClick={handleNextPage}
						disabled={currentPage >= totalPages - 1}
						className="p-1 rounded hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronRight className="h-4 w-4 text-text-tertiary" />
					</button>
				</div>
			</div>

			<div className="relative mb-4">
				<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
				<input
					type="text"
					placeholder="Search for a company..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="h-9 w-full rounded-lg border border-border-primary bg-surface-secondary pl-10 pr-4 text-sm text-text-primary placeholder:text-text-tertiary focus:border-border-focus focus:outline-none focus:ring-1 focus:ring-border-focus"
				/>
			</div>

			{isLoading ? (
				<div className="flex items-center justify-center py-8">
					<Loader2 className="h-6 w-6 animate-spin text-text-tertiary" />
				</div>
			) : (
				<div className="space-y-2">
					{paginatedCompanies.map((company) => (
						<Link
							key={company.slug}
							href={`/platform/leetcode/company/${company.slug}`}
							className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-surface-hover transition-colors"
						>
							<span className="text-sm text-text-secondary font-medium">{company.name}</span>
							<span className="text-xs px-2 py-0.5 rounded-full bg-surface-tertiary text-brand-accent">
								{company.problemCount}
							</span>
						</Link>
					))}
				</div>
			)}

			{!isLoading && filteredCompanies.length === 0 && (
				<div className="mt-8 flex flex-col items-center justify-center py-12">
					<h3 className="mt-4 text-lg font-medium text-text-tertiary">No companies found</h3>
					<div className="mt-2 text-sm text-text-disabled">Try adjusting your search</div>
				</div>
			)}

			{!isLoading && filteredCompanies.length > 0 && (
				<div className="mt-4 text-center text-xs text-text-tertiary">
					Page {currentPage + 1} of {totalPages} ({filteredCompanies.length} companies)
				</div>
			)}
		</div>
	);
}
