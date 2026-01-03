import { cn } from '@/lib/utils';

interface LCBannerProps {
	className?: string;
}

export default function LCBanner({ className }: LCBannerProps) {
	const stats = {
		totalQuestions: 2834,
		easy: 742,
		medium: 1473,
		hard: 619,
		companies: 75,
	};

	return (
		<div
			className={cn(
				'w-full rounded-xl overflow-hidden bg-[#0a0f22] border border-gray-800 shadow-2xl',
				className,
			)}
		>
			<div className="flex items-center justify-between p-8 h-52">
				{/* Left Section */}
				<div className="flex items-center gap-6 text-white">
					<div className="relative flex items-center justify-center">
						<div className="absolute w-16 h-16 bg-cyan-500/20 rounded-full blur-xl"></div>
						<div className="relative z-10 p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
							<svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
								<path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.901-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.981 2.337 1.494 3.834 1.494 1.498 0 2.853-.513 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
							</svg>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
							Coding Challenge Platform
						</span>
						<h1 className="text-3xl font-bold text-gray-100">LeetCode Premium</h1>
						<button className="mt-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all duration-200 hover:shadow-cyan-glow">
							Start Practice Session
						</button>
					</div>
				</div>

				{/* Stats Section */}
				<div className="flex gap-10 pr-6 backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-gray-800">
					<StatItem value={stats.totalQuestions} label="Total" />
					<StatItem value={stats.easy} label="Easy" color="text-green-400" />
					<StatItem value={stats.medium} label="Medium" color="text-amber-400" />
					<StatItem value={stats.hard} label="Hard" color="text-red-400" />
					<StatItem value={stats.companies} label="Companies" color="text-purple-400" />
				</div>
			</div>
		</div>
	);
}

interface StatItemProps {
	value: number;
	label: string;
	color?: string;
}

function StatItem({ value, label, color = 'text-gray-100' }: StatItemProps) {
	return (
		<div className="flex flex-col items-center px-4">
			<span className={`text-2xl font-bold ${color}`}>{value}</span>
			<span className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-1">
				{label}
			</span>
		</div>
	);
}
