import { LCProblem } from '@/types/type';

interface DifficultyBadgeProps {
	difficulty: LCProblem['difficulty'];
}

export default function LcDifficultyBadge({ difficulty }: DifficultyBadgeProps) {
	const getDifficultyColor = (difficulty: LCProblem['difficulty']) => {
		switch (difficulty) {
			case 'Easy':
				return 'text-green-500 border border-green-500/20 bg-green-500/10 inline-flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-500 px-2.5 py-1 rounded-full';
			case 'Medium':
				return 'text-yellow-500 border border-yellow-500/20 bg-yellow-500/10 inline-flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-yellow-500 px-2.5 py-1 rounded-full';
			case 'Hard':
				return 'text-red-500 border border-red-500/20 bg-red-500/10 inline-flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-500 px-2.5 py-1 rounded-full';
			default:
				return '';
		}
	};

	return <span className={`font-medium ${getDifficultyColor(difficulty)}`}>{difficulty}</span>;
}
