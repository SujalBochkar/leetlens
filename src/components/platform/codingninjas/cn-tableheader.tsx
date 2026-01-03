'use client';

import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { CnSearchBar } from './cn-searchbar';

interface TableHeaderProps {
	onSearch: (query: string) => void;
}

export function CnTableHeader({ onSearch }: TableHeaderProps) {
	return (
		<div className="mb-3 flex flex-col">
			<div className="flex w-full flex-wrap gap-2">
				<div className="relative flex-1">
					<Button variant="outline" className="w-full justify-between">
						Status
						<ChevronDownIcon />
					</Button>
				</div>

				<div className="relative flex-1">
					<Button variant="outline" className="w-full justify-between">
						Difficulty
						<ChevronDownIcon />
					</Button>
				</div>

				<div className="flex min-w-[300px] flex-[4_4_0%] gap-2">
					<CnSearchBar onSearch={onSearch} />
				</div>
			</div>
		</div>
	);
}
