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
					className="block w-full rounded-md border border-border-primary bg-surface-secondary pl-10 pr-3 py-2 text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-border-focus"
					placeholder="Search questions..."
					onChange={(e) => onSearch(e.target.value)}
				/>
			</div>
		</div>
	);
}
