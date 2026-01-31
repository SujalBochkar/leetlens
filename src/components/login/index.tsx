'use client';

import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle, FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Provider = 'google' | 'github' | 'apple';

interface SocialLoginButtonProps {
	provider: Provider;
	label: string;
	icon: React.ReactNode;
	delay: number;
}

const SocialLoginButton = ({ provider, label, icon, delay }: SocialLoginButtonProps) => {
	const handleSignIn = () => {
		signIn(provider, { callbackUrl: '/dashboard' });
	};

	const providerStyles: Record<Provider, string> = {
		google: 'hover:border-red-400/50 hover:bg-red-500/5 hover:shadow-red-500/10',
		github: 'hover:border-purple-400/50 hover:bg-purple-500/5 hover:shadow-purple-500/10',
		apple: 'hover:border-gray-400/50 hover:bg-gray-500/5 hover:shadow-gray-500/10',
	};

	return (
		<motion.button
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay }}
			onClick={handleSignIn}
			className={`group w-full flex items-center justify-center gap-3 px-5 py-3.5
				border border-border/60 rounded-xl bg-card/50 backdrop-blur-sm
				transition-all duration-300 text-foreground font-medium
				hover:shadow-lg hover:-translate-y-0.5 cursor-pointer
				${providerStyles[provider]}`}
		>
			<span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
			{label}
		</motion.button>
	);
};

const Login = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{/* Gradient orbs matching landing page */}
				<div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px] animate-pulse" />
				<div className="absolute -right-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse" />
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[120px]" />

				{/* Subtle grid pattern */}
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
						backgroundSize: '40px 40px',
					}}
				/>
			</div>

			{/* Login Card */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="relative w-full max-w-md mx-4"
			>
				<div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
					{/* Logo / Brand */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.1 }}
						className="text-center mb-8"
					>
						<Link href="/" className="inline-block">
							<h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">
								LeetLens
							</h2>
						</Link>
					</motion.div>

					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.2 }}
						className="text-center mb-8"
					>
						<h1 className="text-3xl font-bold text-foreground tracking-tight">Welcome back</h1>
						<p className="mt-2 text-muted-foreground">Sign in to continue your journey</p>
					</motion.div>

					{/* Social Login Buttons */}
					<div className="space-y-3">
						<SocialLoginButton
							provider="google"
							label="Continue with Google"
							icon={<FaGoogle className="w-5 h-5 text-red-500" />}
							delay={0.3}
						/>
						<SocialLoginButton
							provider="github"
							label="Continue with GitHub"
							icon={<FaGithub className="w-5 h-5" />}
							delay={0.4}
						/>
						<SocialLoginButton
							provider="apple"
							label="Continue with Apple"
							icon={<FaApple className="w-5 h-5" />}
							delay={0.5}
						/>
					</div>

					{/* Divider */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.6 }}
						className="relative my-8"
					>
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border/50" />
						</div>
						<div className="relative flex justify-center">
							<span className="px-4 text-xs uppercase tracking-wider text-muted-foreground bg-card/80">
								Secure & Private
							</span>
						</div>
					</motion.div>

					{/* Footer */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4, delay: 0.7 }}
						className="text-center text-sm text-muted-foreground"
					>
						By signing in, you agree to our{' '}
						<Link
							href="/terms"
							className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
						>
							Terms
						</Link>{' '}
						&{' '}
						<Link
							href="/privacy"
							className="text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
						>
							Privacy Policy
						</Link>
					</motion.p>
				</div>
			</motion.div>
		</div>
	);
};

export default Login;
