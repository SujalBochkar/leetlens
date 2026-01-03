'use client';

import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

export function DotPatternBackground() {
	return (
		<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				<DotPattern
					cr={2}
					width={20}
					height={20}
					glow
					className={cn(
						'absolute inset-0 h-full w-full fill-black/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:fill-white/[0.15]',
						'animate-fade-in',
					)}
				/>
			</div>
		</div>
	);
}
