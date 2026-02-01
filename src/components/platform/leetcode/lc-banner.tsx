'use client';

import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useLeetCodeStats } from '@/hooks/use-leetcode';

interface LCBannerProps {
	className?: string;
}

// Memoized banner component - only re-renders when props change
const LCBanner = memo(function LCBanner({ className }: LCBannerProps) {
	// Fetch stats with caching (5 min stale time, 30 min cache)
	const { data, isLoading } = useLeetCodeStats();

	// Fallback stats while loading or if no data
	const stats = useMemo(
		() => ({
			totalQuestions: data?.data?.totalProblems ?? 2834,
			easy: data?.data?.easy ?? 742,
			medium: data?.data?.medium ?? 1473,
			hard: data?.data?.hard ?? 619,
			companies: data?.data?.companyCount ?? 75,
		}),
		[data],
	);

	return (
		<div
			className={cn(
				'w-full rounded-2xl overflow-hidden bg-surface-secondary border border-border-primary',
				className,
			)}
		>
			<div className="p-6">
				{/* Header */}
				<div className="flex items-center gap-2 mb-6">
					<div className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 rounded-full border border-brand-primary/20">
						<Zap className="w-4 h-4 text-brand-primary" />
						<span className="text-sm font-medium text-brand-primary">LeetCode Problems</span>
					</div>
					{isLoading && (
						<span className="text-xs text-text-tertiary animate-pulse">Loading...</span>
					)}
				</div>

				{/* Stats with Vertical Bars */}
				<div className="flex items-end gap-8">
					{/* Total */}
					<div className="flex flex-col items-center">
						<p className="text-3xl font-bold text-text-primary mb-1">
							{stats.totalQuestions.toLocaleString()}
						</p>
						<p className="text-xs text-text-tertiary uppercase tracking-wider">Total</p>
					</div>

					{/* Divider */}
					<div className="h-20 w-px bg-border-primary" />

					{/* Difficulty Bars */}
					<div className="flex items-end gap-4 flex-1">
						<DifficultyBar
							label="Easy"
							value={stats.easy}
							percentage={(stats.easy / stats.totalQuestions) * 100}
							color="emerald"
						/>
						<DifficultyBar
							label="Medium"
							value={stats.medium}
							percentage={(stats.medium / stats.totalQuestions) * 100}
							color="amber"
						/>
						<DifficultyBar
							label="Hard"
							value={stats.hard}
							percentage={(stats.hard / stats.totalQuestions) * 100}
							color="rose"
						/>
					</div>

					{/* Divider */}
					<div className="h-20 w-px bg-border-primary" />

					{/* Companies */}
					<div className="flex flex-col items-center">
						<p className="text-3xl font-bold text-brand-secondary mb-1">{stats.companies}+</p>
						<p className="text-xs text-text-tertiary uppercase tracking-wider">Companies</p>
					</div>
				</div>
			</div>
		</div>
	);
});

LCBanner.displayName = 'LCBanner';

export default LCBanner;

interface DifficultyBarProps {
	label: string;
	value: number;
	percentage: number;
	color: 'emerald' | 'amber' | 'rose';
}

// Memoized difficulty bar - prevents unnecessary re-renders
const DifficultyBar = memo(function DifficultyBar({
	label,
	value,
	percentage,
	color,
}: DifficultyBarProps) {
	const maxHeight = 80;

	// useMemo for expensive calculations
	const barHeight = useMemo(
		() => Math.max((percentage / 60) * maxHeight, 20),
		[percentage, maxHeight],
	);

	// useMemo for color config lookup
	const config = useMemo(() => {
		const colorConfig = {
			emerald: {
				bar: 'bg-emerald-500',
				text: 'text-emerald-500',
				bg: 'bg-emerald-500/10',
				border: 'border-emerald-500/30',
			},
			amber: {
				bar: 'bg-amber-500',
				text: 'text-amber-500',
				bg: 'bg-amber-500/10',
				border: 'border-amber-500/30',
			},
			rose: {
				bar: 'bg-rose-500',
				text: 'text-rose-500',
				bg: 'bg-rose-500/10',
				border: 'border-rose-500/30',
			},
		};
		return colorConfig[color];
	}, [color]);

	return (
		<div className="flex flex-col items-center gap-2 flex-1">
			{/* Bar Container */}
			<div
				className={`w-full max-w-16 rounded-lg ${config.bg} border ${config.border} flex flex-col justify-end p-1.5`}
				style={{ height: maxHeight }}
			>
				<div
					className={`w-full rounded-md ${config.bar} transition-all duration-500`}
					style={{ height: barHeight }}
				/>
			</div>
			{/* Label */}
			<div className="text-center">
				<p className={`text-lg font-bold ${config.text}`}>{value}</p>
				<p className="text-xs text-text-tertiary uppercase tracking-wider">{label}</p>
			</div>
		</div>
	);
});

DifficultyBar.displayName = 'DifficultyBar';
