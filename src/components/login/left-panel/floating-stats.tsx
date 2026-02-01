'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Code2, Trophy } from 'lucide-react';

const stats = [
	{
		icon: Code2,
		value: '3,000+',
		label: 'Problems',
		color: 'from-emerald-500 to-cyan-500',
		delay: 0.5,
	},
	{
		icon: Users,
		value: '50K+',
		label: 'Users',
		color: 'from-blue-500 to-violet-500',
		delay: 0.6,
	},
	{
		icon: Trophy,
		value: '500+',
		label: 'Companies',
		color: 'from-amber-500 to-orange-500',
		delay: 0.7,
	},
	{
		icon: TrendingUp,
		value: '85%',
		label: 'Success Rate',
		color: 'from-rose-500 to-pink-500',
		delay: 0.8,
	},
];

export const FloatingStats = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			className="mt-12"
		>
			<div className="grid grid-cols-2 gap-4">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{
							duration: 0.5,
							delay: stat.delay,
							ease: [0.25, 0.46, 0.45, 0.94],
						}}
						whileHover={{ scale: 1.02, y: -2 }}
						className="group relative"
					>
						{/* Glass Card */}
						<div className="relative p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1]">
							{/* Gradient Glow on Hover */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300`}
							/>

							<div className="relative flex items-center gap-3">
								{/* Icon */}
								<div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
									<stat.icon className="w-5 h-5 text-white" />
								</div>

								{/* Content */}
								<div>
									<p className="text-xl font-bold text-text-primary">{stat.value}</p>
									<p className="text-xs text-text-tertiary font-medium">{stat.label}</p>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
