'use client';

import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (items: number) => void;
}

export function CnPagination({
	currentPage,
	totalPages,
	itemsPerPage,
	onPageChange,
}: PaginationProps) {
	return (
		<div className="mt-4 flex flex-col-reverse items-center md:flex-row md:justify-between">
			<Button variant="outline" className="flex items-center">
				{itemsPerPage} / page
				<ChevronDownIcon />
			</Button>

			<nav className="flex items-center space-x-2 mb-6 md:mb-0">
				<Button
					variant="outline"
					disabled={currentPage === 1}
					onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				>
					<ChevronLeftIcon />
				</Button>
				<span className="mx-2">
					Page {currentPage} of {totalPages}
				</span>
				<Button
					variant="outline"
					disabled={currentPage === totalPages}
					onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
				>
					<ChevronRightIcon />
				</Button>
			</nav>
		</div>
	);
}
