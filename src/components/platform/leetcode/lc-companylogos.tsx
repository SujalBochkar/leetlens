import Image from 'next/image';

interface CompanyLogo {
	name: string;
	logo: string;
}

interface CompanyLogosProps {
	companies: CompanyLogo[];
}

export default function LcCompanyLogos({ companies }: CompanyLogosProps) {
	if (!companies || companies.length === 0) {
		return <span className="text-text-tertiary">-</span>;
	}

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
				<span className="text-sm text-text-tertiary">+{companies.length - 3}</span>
			)}
		</div>
	);
}
