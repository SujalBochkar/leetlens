import Link from 'next/link';
import { Bot, Lightbulb } from 'lucide-react';
import LcDifficultyBadge from './lc-difficultybadge';
import LcCompanyLogos from './lc-companylogos';
import LcActionButton from './lc-actionbutton';
import LcStatisticCell from './lc-statisticcell';
import { LCProblem } from '@/types/type';

interface ProblemRowProps {
	problem: LCProblem;
}

export default function LcProblemRow({ problem }: ProblemRowProps) {
	// Get primary topic as category
	const category = problem.topics?.[0]?.name || problem.category || '-';

	// Format acceptance rate
	const acceptanceRate = problem.acceptanceRate ? `${problem.acceptanceRate.toFixed(1)}%` : '-';

	// Transform companies for the logos component
	const companies =
		problem.companies?.map((c) => ({
			name: c.name,
			logo: c.logoUrl || `/assets/company-logos/${c.slug}.png`,
		})) || [];

	return (
		<tr className="border-b border-border-primary transition-colors hover:bg-surface-hover">
			<td className="p-4">
				<input
					type="checkbox"
					checked={problem.isCompleted || problem.status === 'ac'}
					className="h-4 w-4 rounded border-border-primary bg-surface-secondary"
					onChange={() => {}}
				/>
			</td>
			<td className="p-4 text-text-tertiary">{problem.questionNumber || problem.id}</td>
			<td className="p-4">
				<Link
					href={`https://leetcode.com/problems/${problem.titleSlug}/`}
					target="_blank"
					className="text-text-primary hover:text-text-link"
				>
					{problem.title}
					{problem.isPaidOnly && <span className="ml-2 text-xs text-status-warning">🔒</span>}
				</Link>
			</td>
			<td className="p-4 text-text-secondary">{category}</td>
			<td className="p-4">
				<LcDifficultyBadge difficulty={problem.difficulty} />
			</td>
			<td className="p-4">
				<LcStatisticCell value={acceptanceRate} />
			</td>
			<td className="p-4">
				<LcCompanyLogos companies={companies} />
			</td>
			<td className="p-4">{problem.hasSolution && <LcActionButton Icon={Lightbulb} />}</td>
			<td className="p-4">
				<LcActionButton Icon={Bot} />
			</td>
		</tr>
	);
}
