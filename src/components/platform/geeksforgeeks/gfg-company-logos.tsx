'use client';

import Image from 'next/image';
import { GFGProblem } from '@/types/type';

interface CompanyLogosProps {
	companies: GFGProblem['companies'];
}

export default function GfgCompanyLogos({ companies }: CompanyLogosProps) {
	return (
		<div className="flex items-center justify-center gap-2">
			{companies.slice(0, 3).map((company) => (
				<Image
					key={company.name}
					src={company.logo}
					alt={company.name}
					width={20}
					height={20}
					className="rounded-sm"
				/>
			))}
			{companies.length > 3 && (
				<span className="text-sm text-text-tertiary">+{companies.length - 3}</span>
			)}
		</div>
	);
}
