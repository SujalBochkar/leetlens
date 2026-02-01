'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HelpCircle, Shield, FileText } from 'lucide-react';

export const FooterLinks = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.5 }}
			className="mt-8 space-y-6"
		>
			{/* Trust Badges */}
			<div className="flex items-center justify-center gap-6">
				<div className="flex items-center gap-2 text-xs text-text-tertiary">
					<Shield className="w-4 h-4 text-brand-primary" />
					<span>SSL Encrypted</span>
				</div>
				<div className="flex items-center gap-2 text-xs text-text-tertiary">
					<svg
						className="w-4 h-4 text-brand-primary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
					<span>Privacy First</span>
				</div>
			</div>

			{/* Legal Links */}
			<p className="text-center text-sm text-text-tertiary">
				By continuing, you agree to our{' '}
				<Link
					href="/terms"
					className="text-text-secondary hover:text-brand-primary underline-offset-4 hover:underline transition-colors"
				>
					Terms of Service
				</Link>{' '}
				and{' '}
				<Link
					href="/privacy"
					className="text-text-secondary hover:text-brand-primary underline-offset-4 hover:underline transition-colors"
				>
					Privacy Policy
				</Link>
			</p>

			{/* Help Link */}
			<div className="flex justify-center">
				<Link
					href="/help"
					className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-brand-primary transition-colors"
				>
					<HelpCircle className="w-4 h-4" />
					Need help signing in?
				</Link>
			</div>
		</motion.div>
	);
};
