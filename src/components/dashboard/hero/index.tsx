import LandingContent from './content';
import { DotPatternBackground } from './dotgrids';
import LandingGradientBg from './gradient-bg';
import LandingSocialLinks from './social-links';

export default function LandingHero() {
	return (
		<div className="relative min-h-[calc(100vh-6rem)] w-full overflow-hidden bg-gradient-to-br from-background via-background/95 to-background">
			<div className="absolute inset-0">
				<DotPatternBackground />
				<LandingGradientBg />
			</div>

			{/* Main content */}
			<LandingContent />

			{/* Social links */}
			<LandingSocialLinks />
		</div>
	);
}
