'use client';

import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Main gradient orbs */}
			<motion.div
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl"
			/>

			<motion.div
				animate={{
					scale: [1, 1.1, 1],
					opacity: [0.2, 0.4, 0.2],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 2,
				}}
				className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/15 via-violet-500/10 to-transparent blur-3xl"
			/>

			{/* Subtle grid pattern */}
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
					backgroundSize: '64px 64px',
				}}
			/>

			{/* Floating particles */}
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					animate={{
						y: [-20, 20, -20],
						x: [-10, 10, -10],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						duration: 6 + i * 2,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: i * 0.5,
					}}
					className="absolute w-2 h-2 rounded-full bg-emerald-400/30"
					style={{
						top: `${20 + i * 15}%`,
						left: `${10 + i * 12}%`,
					}}
				/>
			))}

			{/* Diagonal lines */}
			<svg
				className="absolute inset-0 w-full h-full opacity-[0.03]"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern
						id="diagonalLines"
						patternUnits="userSpaceOnUse"
						width="40"
						height="40"
						patternTransform="rotate(45)"
					>
						<line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#diagonalLines)" />
			</svg>
		</div>
	);
};
