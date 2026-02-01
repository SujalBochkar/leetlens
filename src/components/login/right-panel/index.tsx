'use client';

import { AuthHeader } from './auth-header';
import { SocialButtons } from './social-buttons';
import { FooterLinks } from './footer-links';

export const RightPanel = () => {
	return (
		<div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-surface-page min-h-screen">
			<div className="w-full max-w-md">
				{/* Auth Content */}
				<div className="space-y-2">
					<AuthHeader />
					<SocialButtons />
					<FooterLinks />
				</div>

				{/* Bottom branding for mobile */}
				<div className="mt-12 text-center lg:hidden">
					<p className="text-xs text-text-tertiary">© 2026 LeetLens. All rights reserved.</p>
				</div>
			</div>
		</div>
	);
};
