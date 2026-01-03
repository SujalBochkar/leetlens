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
		<tr className="border-b border-zinc-800 transition-colors hover:bg-zinc-800/50">
			<td className="p-4">
				<input
					type="checkbox"
					checked={problem.isCompleted}
					className="h-4 w-4 rounded border-zinc-700 bg-zinc-900"
					onChange={() => {}}
				/>
			</td>
			<td className="p-4 text-zinc-400">{problem.id}</td>
			<td className="p-4">
				<Link href={`/gfg/problems/${problem.id}`} className="text-zinc-100 hover:text-blue-500">
					{problem.title}
				</Link>
			</td>
			<td className="p-4 text-zinc-300">{problem.category}</td>
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
