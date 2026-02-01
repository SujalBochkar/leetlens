'use client';

import { useState } from 'react';
import {
	FiFilter as Filter,
	FiSearch as Search,
	FiShuffle as Shuffle,
	FiChevronDown as ChevronDown,
	FiChevronUp as ChevronUp,
} from 'react-icons/fi';
import { FaChevronDown as ChevronsUpDown } from 'react-icons/fa';
import { TbArrowsUpDown as ArrowUpDown } from 'react-icons/tb';
import { HiOutlineSparkles as Bot } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Question {
	id: number;
	title: string;
	difficulty: 'Easy' | 'Medium' | 'Hard';
	frequency: number;
	isSolved: boolean;
	hasAISolution: boolean;
	category?: string;
	hints?: number;
}

type SortKey = keyof Question;
type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
	key: SortKey | null;
	direction: SortDirection;
}

export default function LcCompanyQuestions() {
	const [timePeriod, setTimePeriod] = useState('last 6 months');
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: null,
		direction: null,
	});

	const questions: Question[] = [
		{
			id: 1,
			title: 'Two Sum',
			difficulty: 'Easy',
			frequency: 45,
			isSolved: true,
			hasAISolution: true,
			category: 'Array',
			hints: 2,
		},
		{
			id: 2,
			title: 'Add Two Numbers',
			difficulty: 'Medium',
			frequency: 38,
			isSolved: false,
			hasAISolution: true,
			category: 'Linked List',
			hints: 1,
		},
		{
			id: 3,
			title: 'Median of Two Sorted Arrays',
			difficulty: 'Hard',
			frequency: 32,
			isSolved: false,
			hasAISolution: true,
			category: 'Array',
			hints: 3,
		},
		{
			id: 4,
			title: 'Valid Parentheses',
			difficulty: 'Easy',
			frequency: 41,
			isSolved: true,
			hasAISolution: true,
			category: 'Stack',
			hints: 1,
		},
		{
			id: 5,
			title: 'Merge k Sorted Lists',
			difficulty: 'Hard',
			frequency: 35,
			isSolved: false,
			hasAISolution: true,
			category: 'Linked List',
			hints: 2,
		},
		{
			id: 6,
			title: 'Longest Substring Without Repeating Characters',
			difficulty: 'Medium',
			frequency: 40,
			isSolved: true,
			hasAISolution: true,
			category: 'String',
			hints: 2,
		},
		{
			id: 7,
			title: 'Zigzag Conversion',
			difficulty: 'Medium',
			frequency: 30,
			isSolved: false,
			hasAISolution: false,
			category: 'String',
			hints: 1,
		},
		{
			id: 8,
			title: 'Reverse Integer',
			difficulty: 'Easy',
			frequency: 50,
			isSolved: true,
			hasAISolution: true,
			category: 'Math',
			hints: 1,
		},
		{
			id: 9,
			title: 'String to Integer (atoi)',
			difficulty: 'Medium',
			frequency: 28,
			isSolved: false,
			hasAISolution: false,
			category: 'String',
			hints: 3,
		},
		{
			id: 10,
			title: 'Palindrome Number',
			difficulty: 'Easy',
			frequency: 42,
			isSolved: true,
			hasAISolution: true,
			category: 'Math',
			hints: 1,
		},
		{
			id: 11,
			title: 'Container With Most Water',
			difficulty: 'Medium',
			frequency: 37,
			isSolved: false,
			hasAISolution: true,
			category: 'Array',
			hints: 2,
		},
		{
			id: 12,
			title: 'Roman to Integer',
			difficulty: 'Easy',
			frequency: 44,
			isSolved: true,
			hasAISolution: true,
			category: 'String',
			hints: 1,
		},
		{
			id: 13,
			title: 'Longest Common Prefix',
			difficulty: 'Easy',
			frequency: 39,
			isSolved: true,
			hasAISolution: true,
			category: 'String',
			hints: 1,
		},
		{
			id: 14,
			title: '3Sum',
			difficulty: 'Medium',
			frequency: 33,
			isSolved: false,
			hasAISolution: true,
			category: 'Array',
			hints: 2,
		},
		{
			id: 15,
			title: 'Letter Combinations of a Phone Number',
			difficulty: 'Medium',
			frequency: 31,
			isSolved: false,
			hasAISolution: true,
			category: 'String',
			hints: 2,
		},
		{
			id: 16,
			title: 'Remove Nth Node From End of List',
			difficulty: 'Medium',
			frequency: 36,
			isSolved: false,
			hasAISolution: true,
			category: 'Linked List',
			hints: 1,
		},
		{
			id: 17,
			title: 'Valid Sudoku',
			difficulty: 'Medium',
			frequency: 29,
			isSolved: false,
			hasAISolution: false,
			category: 'Array',
			hints: 3,
		},
		{
			id: 18,
			title: 'Search in Rotated Sorted Array',
			difficulty: 'Medium',
			frequency: 34,
			isSolved: false,
			hasAISolution: true,
			category: 'Array',
			hints: 2,
		},
		{
			id: 19,
			title: 'Combination Sum',
			difficulty: 'Medium',
			frequency: 27,
			isSolved: false,
			hasAISolution: true,
			category: 'Array',
			hints: 2,
		},
		{
			id: 20,
			title: 'First Missing Positive',
			difficulty: 'Hard',
			frequency: 26,
			isSolved: false,
			hasAISolution: true,
			category: 'Array',
			hints: 3,
		},
	];

	const getSortedQuestions = () => {
		if (!sortConfig.key) return questions;

		return [...questions].sort((a, b) => {
			const key = sortConfig.key as keyof Question;

			if (key === 'difficulty') {
				const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
				const aValue = difficultyOrder[a.difficulty];
				const bValue = difficultyOrder[b.difficulty];
				return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
			}

			const aValue = a[key];
			const bValue = b[key];

			if (typeof aValue === 'undefined' && typeof bValue === 'undefined') return 0;
			if (typeof aValue === 'undefined') return 1;
			if (typeof bValue === 'undefined') return -1;

			if (aValue < bValue) {
				return sortConfig.direction === 'asc' ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortConfig.direction === 'asc' ? 1 : -1;
			}
			return 0;
		});
	};

	const requestSort = (key: SortKey) => {
		let direction: SortDirection = 'asc';

		if (sortConfig.key === key) {
			if (sortConfig.direction === null) {
				direction = 'asc';
			} else if (sortConfig.direction === 'asc') {
				direction = 'desc';
			} else {
				direction = null;
			}
		}

		setSortConfig({ key, direction });
	};

	const getSortIcon = (key: SortKey) => {
		if (sortConfig.key !== key) return <ChevronsUpDown className="h-4 w-4" />;
		if (sortConfig.direction === 'asc') return <ChevronUp className="h-4 w-4" />;
		if (sortConfig.direction === 'desc') return <ChevronDown className="h-4 w-4" />;
		return <ChevronsUpDown className="h-4 w-4" />;
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between rounded-lg bg-card p-4 border border-gray-200 dark:border-white/30">
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" className="rounded-full hover:bg-accent" title="Sort">
						<ArrowUpDown className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full hover:bg-accent"
						title="Filter"
					>
						<Filter className="h-4 w-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full hover:bg-accent"
						title="Search"
					>
						<Search className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full hover:bg-accent"
						disabled
						title="Random"
					>
						<Shuffle className="h-4 w-4" />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="rounded-full text-xs font-medium shadow-sm hover:opacity-90 transition-opacity"
								style={{
									background:
										'linear-gradient(91deg, rgb(255, 228, 178) 0%, rgb(249, 191, 105) 100%)',
								}}
							>
								{timePeriod} <ChevronDown className="ml-1 h-3 w-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="bg-popover">
							<DropdownMenuItem onClick={() => setTimePeriod('last 6 months')}>
								last 6 months
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTimePeriod('last 1 years')}>
								last 1 years
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTimePeriod('last 2 years')}>
								last 2 years
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTimePeriod('Alltime')}>Alltime</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="rounded-lg border border-border-primary overflow-hidden">
				<table className="w-full">
					<thead className="bg-surface-secondary">
						<tr className="border-b border-border-primary">
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('isSolved')}
							>
								<div className="flex items-center gap-1">
									Status
									{getSortIcon('isSolved')}
								</div>
							</th>
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('id')}
							>
								<div className="flex items-center gap-1">#{getSortIcon('id')}</div>
							</th>
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('title')}
							>
								<div className="flex items-center gap-1">
									Title
									{getSortIcon('title')}
								</div>
							</th>
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('category')}
							>
								<div className="flex items-center gap-1">
									Category
									{getSortIcon('category')}
								</div>
							</th>
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('difficulty')}
							>
								<div className="flex items-center gap-1">
									Difficulty
									{getSortIcon('difficulty')}
								</div>
							</th>
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('frequency')}
							>
								<div className="flex items-center gap-1">
									Frequency
									{getSortIcon('frequency')}
								</div>
							</th>
							<th
								className="p-4 text-left font-medium text-text-tertiary cursor-pointer hover:text-text-primary"
								onClick={() => requestSort('hints')}
							>
								<div className="flex items-center gap-1">
									Hints
									{getSortIcon('hints')}
								</div>
							</th>
							<th className="p-4 text-left font-medium text-text-tertiary">AI Help</th>
						</tr>
					</thead>
					<tbody>
						{getSortedQuestions().map((question) => (
							<tr
								key={question.id}
								className="border-b border-border-primary hover:bg-surface-hover transition-colors"
							>
								<td className="p-4">
									<input
										type="checkbox"
										checked={question.isSolved}
										readOnly
										className="h-4 w-4 rounded border-input"
									/>
								</td>
								<td className="p-4 text-sm text-muted-foreground">{question.id}</td>
								<td className="p-4 font-medium">{question.title}</td>
								<td className="p-4 text-sm text-muted-foreground">{question.category}</td>
								<td className="p-4">
									<span
										className={`inline-flex items-center gap-1.5 before:w-1.5 before:h-1.5 before:rounded-full px-2.5 py-1 rounded-full text-xs font-medium
                    ${
											question.difficulty === 'Easy'
												? 'text-difficulty-easy border border-difficulty-easy-border bg-difficulty-easy-bg before:bg-difficulty-easy'
												: question.difficulty === 'Medium'
													? 'text-difficulty-medium border border-difficulty-medium-border bg-difficulty-medium-bg before:bg-difficulty-medium'
													: 'text-difficulty-hard border border-difficulty-hard-border bg-difficulty-hard-bg before:bg-difficulty-hard'
										}`}
									>
										{question.difficulty}
									</span>
								</td>
								<td className="p-4">
									<span className="inline-flex items-center rounded-full bg-status-info/10 px-2 py-1 text-xs font-medium text-status-info">
										{question.frequency}%
									</span>
								</td>
								<td className="p-4">
									<span className="text-sm text-muted-foreground">{question.hints}</span>
								</td>
								<td className="p-4">
									<span
										className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center ${
											question.hasAISolution
												? 'bg-status-success/10 text-status-success'
												: 'bg-surface-tertiary text-text-disabled'
										}`}
									>
										{question.hasAISolution ? <Bot className="h-3.5 w-3.5" /> : 'N/A'}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
