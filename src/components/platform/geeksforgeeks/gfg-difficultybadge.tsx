import { GFGProblem } from '@/types/type';

interface DifficultyBadgeProps {
	difficulty: GFGProblem['difficulty'];
}

export default function GfgDifficultyBadge({ difficulty }: DifficultyBadgeProps) {
	const getDifficultyColor = (difficulty: GFGProblem['difficulty']) => {
		const baseStyles =
			'inline-flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:rounded-full px-2.5 py-1 rounded-full border';

		switch (difficulty) {
			case 'Easy':
				return `${baseStyles} text-difficulty-easy border-difficulty-easy-border bg-difficulty-easy-bg before:bg-difficulty-easy`;
			case 'Medium':
				return `${baseStyles} text-difficulty-medium border-difficulty-medium-border bg-difficulty-medium-bg before:bg-difficulty-medium`;
			case 'Hard':
				return `${baseStyles} text-difficulty-hard border-difficulty-hard-border bg-difficulty-hard-bg before:bg-difficulty-hard`;
			default:
				return baseStyles;
		}
	};

	return <span className={`font-medium ${getDifficultyColor(difficulty)}`}>{difficulty}</span>;
}
