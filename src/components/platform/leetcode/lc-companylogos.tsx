import { LCProblem } from '@/types/type';
import Image from 'next/image';

interface CompanyLogosProps {
	companies: LCProblem['companies'];
}

export default function LcCompanyLogos({ companies }: CompanyLogosProps) {
	return (
		<div className="flex items-center justify-center gap-2">
			{companies.slice(0, 3).map((company, index) => (
				<Image
					key={index}
					src={company.logo}
					alt={company.name}
					width={20}
					height={20}
					className="rounded-sm"
				/>
			))}
			{companies.length > 3 && (
				<span className="text-sm text-zinc-500">+{companies.length - 3}</span>
			)}
		</div>
	);
}
