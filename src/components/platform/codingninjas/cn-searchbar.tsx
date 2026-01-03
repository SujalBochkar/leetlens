'use client';

import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
	onSearch: (query: string) => void;
}

export function CnSearchBar({ onSearch }: SearchBarProps) {
	return (
		<div className="relative flex-1">
			<div className="relative rounded-md">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<SearchIcon />
				</div>
				<input
					type="text"
					className="block w-full rounded-md border-none bg-fill-3 dark:bg-dark-fill-3 pl-10 pr-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Search questions..."
					onChange={(e) => onSearch(e.target.value)}
				/>
			</div>
		</div>
	);
}
