'use client';

import { BrandLogo } from './brand-logo';
import { Tagline } from './tagline';
import { FloatingStats } from './floating-stats';
import { AnimatedBackground } from '../shared/animated-bg';

export const LeftPanel = () => {
	return (
		<div className="relative hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between p-12 xl:p-16 bg-surface-page overflow-hidden">
			{/* Animated Background */}
			<AnimatedBackground />

			{/* Content */}
			<div className="relative z-10">
				<BrandLogo />
			</div>

			<div className="relative z-10 flex-1 flex flex-col justify-center max-w-xl">
				<Tagline />
				<FloatingStats />
			</div>

			{/* Bottom Quote */}
			<div className="relative z-10 mt-auto pt-8">
				<div className="flex items-center gap-4">
					<div className="flex -space-x-2">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="w-8 h-8 rounded-full bg-gradient-to-br from-surface-tertiary to-surface-secondary border-2 border-surface-page flex items-center justify-center"
							>
								<span className="text-xs text-text-tertiary">👤</span>
							</div>
						))}
					</div>
					<p className="text-sm text-text-tertiary">
						<span className="text-text-secondary font-medium">10,000+</span> developers already
						leveling up
					</p>
				</div>
			</div>
		</div>
	);
};
