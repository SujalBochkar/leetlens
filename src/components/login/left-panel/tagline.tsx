'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const taglines = [
	{ text: 'Track your progress', highlight: 'effortlessly' },
	{ text: 'Master algorithms', highlight: 'systematically' },
	{ text: 'Land your dream job', highlight: 'confidently' },
	{ text: 'Solve problems', highlight: 'intelligently' },
];

export const Tagline = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % taglines.length);
		}, 3500);
		return () => clearInterval(interval);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8, delay: 0.3 }}
			className="space-y-6"
		>
			{/* Main Tagline */}
			<div className="space-y-2">
				<h2 className="text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
					Your path to
					<br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
						coding mastery
					</span>
				</h2>
			</div>

			{/* Rotating Subtitle */}
			<div className="h-8 overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.p
						key={currentIndex}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
						className="text-lg text-text-tertiary"
					>
						{taglines[currentIndex].text}{' '}
						<span className="text-brand-primary font-medium">
							{taglines[currentIndex].highlight}
						</span>
					</motion.p>
				</AnimatePresence>
			</div>
		</motion.div>
	);
};
