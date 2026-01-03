'use client';

import { CheckIcon } from 'lucide-react';

interface Problem {
	id: number;
	title: string;
	difficulty: 'Easy' | 'Medium' | 'Hard';
	avgTimeToSolve: string;
	hasSolution: boolean;
	isComplete?: boolean;
}

interface TableRowProps {
	problem: Problem;
}

export function CnTableRow({ problem }: TableRowProps) {
	return (
		<div
			role="row"
			className="flex cursor-pointer items-center gap-4 hover:bg-fill-3 dark:hover:bg-dark-fill-3 relative"
		>
			<div role="cell" className="mx-2 w-[20px] text-center">
				{problem.isComplete && <CheckIcon />}
			</div>
			<div role="cell" className="mx-2 w-[600px] py-[11px]">
				<div className="flex items-center">
					<div className="overflow-hidden">
						<div className="flex items-center">
							<div>{problem.title}</div>
						</div>
					</div>
				</div>
			</div>
			<div
				role="cell"
				className={`mx-2 w-[84px] ${
					problem.difficulty === 'Easy'
						? 'text-olive dark:text-dark-olive'
						: problem.difficulty === 'Medium'
							? 'text-yellow dark:text-dark-yellow'
							: 'text-pink dark:text-dark-pink'
				}`}
			>
				{problem.difficulty}
			</div>
			<div role="cell" className="mx-2 w-[120px]">
				{problem.avgTimeToSolve}
			</div>
		</div>
	);
}
