'use client';

import { motion } from 'framer-motion';

export const BrandLogo = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className="mb-8"
		>
			<div className="flex items-center gap-3">
				{/* Logo Icon */}
				<div className="relative">
					<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center shadow-lg shadow-brand-primary/25">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							className="w-7 h-7 text-white"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					</div>
					{/* Glow effect */}
					<div className="absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary blur-xl opacity-40 -z-10" />
				</div>

				{/* Logo Text */}
				<div>
					<h1 className="text-2xl font-bold text-text-primary tracking-tight">
						Leet<span className="text-brand-primary">Lens</span>
					</h1>
					<p className="text-xs text-text-tertiary font-medium tracking-wider uppercase">
						Master DSA
					</p>
				</div>
			</div>
		</motion.div>
	);
};
