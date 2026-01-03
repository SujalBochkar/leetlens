'use client';

import Image from 'next/image';

interface CompanyCardProps {
	name: string;
	imageUrl: string;
	questionCount: number;
	lastUpdated: string;
	easyCount?: number;
	mediumCount?: number;
	hardCount?: number;
}

export default function LcCompanyCard({
	name,
	imageUrl,
	questionCount,
	easyCount = 0,
	mediumCount = 0,
	hardCount = 0,
}: CompanyCardProps) {
	return (
		<div className="bg-card rounded-lg border border-gray-200 p-8 dark:border-white/30 space-y-8 min-h-[400px]">
			<div className="flex flex-col items-center text-center">
				<div className="w-24 h-24 relative mb-6">
					<Image
						className="rounded-lg object-cover"
						src={imageUrl || '/company-placeholder.png'}
						alt={`${name} logo`}
						fill
						priority
					/>
				</div>
				<h1 className="text-3xl font-semibold text-foreground">{name}</h1>
			</div>

			<div className="space-y-6">
				<div className="flex items-center justify-center gap-3 text-muted-foreground">
					<span className="h-5 w-5">{questionCount}</span>
					<span className="text-base">{questionCount} questions</span>
				</div>
				<div className="grid grid-cols-1 gap-3 text-base">
					<span className="text-green-500 border border-green-500/20 bg-green-500/10 px-4 py-2 rounded-full text-center whitespace-nowrap">
						{easyCount} Easy
					</span>
					<span className="text-yellow-500 border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 rounded-full text-center whitespace-nowrap">
						{mediumCount} Medium
					</span>
					<span className="text-red-500 border border-red-500/20 bg-red-500/10 px-4 py-2 rounded-full text-center whitespace-nowrap">
						{hardCount} Hard
					</span>
				</div>
				{/* <div className="flex items-center gap-3 text-muted-foreground">
          <CalendarDays className="h-4 w-4"/>
          <span className="text-sm">Updated {lastUpdated}</span>
        </div> */}
			</div>
		</div>
	);
}
