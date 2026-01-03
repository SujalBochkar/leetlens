import Link from 'next/link';
import { Bot, Lightbulb } from 'lucide-react';
import LcDifficultyBadge from './lc-difficultybadge';
import LcCompanyLogos from './lc-companylogos';
import LcActionButton from './lc-actionbutton';
import LcStatisticCell from './lc-statisticcell';
import { LCProblem } from '@/types/type';
import { formatNumber } from '@/utils/utils';
import { calculateAcceptanceRate } from '@/utils/utils';

interface ProblemRowProps {
	problem: LCProblem;
}

export default function LcProblemRow({ problem }: ProblemRowProps) {
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
				<Link href={`/problems/${problem.id}`} className="text-zinc-100 hover:text-blue-500">
					{problem.title}
				</Link>
			</td>
			<td className="p-4 text-zinc-300">{problem.category}</td>
			<td className="p-4">
				<LcDifficultyBadge difficulty={problem.difficulty} />
			</td>
			<td className="p-4">
				<LcStatisticCell
					value={`${calculateAcceptanceRate(
						problem.statistics.totalAccepted,
						problem.statistics.totalSubmitted,
					)}%`}
				/>
			</td>
			<td className="p-4">
				<LcCompanyLogos companies={problem.companies} />
			</td>
			<td className="p-4">
				<LcStatisticCell value={formatNumber(problem.statistics.totalSubmitted)} />
			</td>
			<td className="p-4">
				<LcStatisticCell value={formatNumber(problem.statistics.totalAccepted)} />
			</td>
			<td className="p-4 text-center">
				<LcActionButton Icon={Lightbulb} />
			</td>
			<td className="p-4 text-center">
				<LcActionButton Icon={Bot} />
			</td>
		</tr>
	);
}
