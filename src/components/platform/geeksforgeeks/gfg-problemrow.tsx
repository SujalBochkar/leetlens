'use client';

import Link from 'next/link';
import { Bot, Lightbulb, Code } from 'lucide-react';
import GfgDifficultyBadge from './gfg-difficultybadge';
import GfgActionButton from './gfg-actionbutton';
import GfgCompanyLogos from './gfg-company-logos';
import { GFGProblem } from '@/types/type';

interface ProblemRowProps {
	problem: GFGProblem;
}

export default function GfgProblemRow({ problem }: ProblemRowProps) {
	return (
		<tr className="border-b border-border-primary transition-colors hover:bg-surface-hover">
			<td className="p-4">
				<input
					type="checkbox"
					checked={problem.isCompleted}
					className="h-4 w-4 rounded border-border-primary bg-surface-secondary"
					onChange={() => {}}
				/>
			</td>
			<td className="p-4 text-text-tertiary">{problem.id}</td>
			<td className="p-4">
				<Link
					href={`/gfg/problems/${problem.id}`}
					className="text-text-primary hover:text-text-link"
				>
					{problem.title}
				</Link>
			</td>
			<td className="p-4 text-text-secondary">{problem.category}</td>
			<td className="p-4">
				<GfgDifficultyBadge difficulty={problem.difficulty} />
			</td>
			<td className="p-4">
				<GfgCompanyLogos companies={problem.companies} />
			</td>
			<td className="p-4 text-center">
				<GfgActionButton Icon={Code} />
			</td>
			<td className="p-4 text-center">
				<GfgActionButton Icon={Lightbulb} />
			</td>
			<td className="p-4 text-center">
				<GfgActionButton Icon={Bot} />
			</td>
		</tr>
	);
}
