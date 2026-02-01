interface StatisticCellProps {
	value: string;
}

export default function LcStatisticCell({ value }: StatisticCellProps) {
	return (
		<div className="flex flex-col items-center text-text-secondary">
			<span>{value}</span>
		</div>
	);
}
