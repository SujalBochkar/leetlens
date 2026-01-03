interface StatisticCellProps {
	value: string;
}

export default function LcStatisticCell({ value }: StatisticCellProps) {
	return (
		<div className="flex flex-col items-center text-zinc-300">
			<span>{value}</span>
		</div>
	);
}
