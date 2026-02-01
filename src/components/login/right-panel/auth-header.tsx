'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const AuthHeader = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.1 }}
			className="space-y-2"
		>
			{/* Mobile Logo */}
			<div className="lg:hidden mb-8">
				<Link href="/" className="inline-flex items-center gap-2">
					<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent flex items-center justify-center">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							className="w-6 h-6 text-text-inverse"
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
					<span className="text-xl font-bold text-text-primary">
						Leet<span className="text-brand-primary">Lens</span>
					</span>
				</Link>
			</div>

			<h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
				Welcome back
			</h1>
			<p className="text-text-tertiary text-base">Sign in to continue your coding journey</p>
		</motion.div>
	);
};
