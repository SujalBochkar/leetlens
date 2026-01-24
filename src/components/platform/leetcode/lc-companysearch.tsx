'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SearchIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface Company {
	name: string;
	slug: string;
	problemCount: number;
}

export default function LcCompanySearch() {
	const [searchQuery, setSearchQuery] = useState('');

	const companies: Company[] = [
		{
			name: 'Meta',
			slug: 'facebook',
			problemCount: 980,
		},
		{
			name: 'Google',
			slug: 'google',
			problemCount: 1738,
		},
		{
			name: 'Amazon',
			slug: 'amazon',
			problemCount: 1758,
		},
		{
			name: 'Apple',
			slug: 'apple',
			problemCount: 723,
		},
		{
			name: 'TikTok',
			slug: 'tiktok',
			problemCount: 429,
		},
		{
			name: 'Bloomberg',
			slug: 'bloomberg',
			problemCount: 895,
		},
		{
			name: 'Microsoft',
			slug: 'microsoft',
			problemCount: 1038,
		},
		{
			name: 'Goldman Sachs',
			slug: 'goldman-sachs',
			problemCount: 212,
		},
		{
			name: 'LinkedIn',
			slug: 'linkedin',
			problemCount: 146,
		},
		{
			name: 'Oracle',
			slug: 'oracle',
			problemCount: 284,
		},
		{
			name: 'Citadel',
			slug: 'citadel',
			problemCount: 99,
		},
		{
			name: 'Salesforce',
			slug: 'salesforce',
			problemCount: 184,
		},
		{
			name: 'DoorDash',
			slug: 'doordash',
			problemCount: 77,
		},
		{
			name: 'Nvidia',
			slug: 'nvidia',
			problemCount: 122,
		},
		{
			name: 'Adobe',
			slug: 'adobe',
			problemCount: 712,
		},
		{
			name: 'Atlassian',
			slug: 'atlassian',
			problemCount: 65,
		},
		{
			name: 'Snap',
			slug: 'snap',
			problemCount: 112,
		},
		{
			name: 'Walmart Labs',
			slug: 'walmart-labs',
			problemCount: 156,
		},
		{
			name: 'Capital One',
			slug: 'capital-one',
			problemCount: 87,
		},
	];

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="w-[20rem] rounded-xl border border-zinc-800 bg-zinc-950 p-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-zinc-200 font-medium">Trending Companies</h2>
				<div className="flex gap-1">
					<button className="p-1 rounded hover:bg-zinc-800">
						<ChevronLeft className="h-4 w-4 text-zinc-400" />
					</button>
					<button className="p-1 rounded hover:bg-zinc-800">
						<ChevronRight className="h-4 w-4 text-zinc-400" />
					</button>
				</div>
			</div>

			<div className="relative mb-4">
				<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
				<input
					type="text"
					placeholder="Search for a company..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="h-9 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700"
				/>
			</div>

			<div className="space-y-2">
				{filteredCompanies.map((company) => (
					<Link
						key={company.slug}
						href={`/platform/leetcode/${company.slug}`}
						className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-zinc-900 transition-colors"
					>
						<span className="text-sm text-zinc-300 font-medium">{company.name}</span>
						<span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800/50 text-orange-400/90">
							{company.problemCount}
						</span>
					</Link>
				))}
			</div>

			{filteredCompanies.length === 0 && (
				<div className="mt-8 flex flex-col items-center justify-center py-12">
					<h3 className="mt-4 text-lg font-medium text-zinc-400">No companies found</h3>
					<div className="mt-2 text-sm text-zinc-500">Try adjusting your search</div>
				</div>
			)}
		</div>
	);
}
