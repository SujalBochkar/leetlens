'use client';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { useRouter } from 'next/navigation';
import { BsArrowRight } from 'react-icons/bs';

export default function LandingContent() {
	const router = useRouter();
	return (
		<div className="relative flex min-h-[calc(100vh-20rem)] flex-col items-center justify-center px-4">
			<div className="mb-8 text-center">
				<AnimatedShinyText>✨ Introducing LeetLens!</AnimatedShinyText>
				<h1 className="text-center md:max-w-6xl animate-fade-up text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-text-primary to-brand-secondary text-transparent bg-clip-text sm:text-6xl md:min-h-[180x]">
					<div>Master Company Specific DSA Questions</div>
				</h1>
				<div className="mt-4 text-text-secondary sm:text-xl text-center mx-auto max-w-5xl">
					<div>
						Access curated collections of interview questions from top companies, along with
						structured DSA sheets. Practice, learn, and prepare with our company specific questions
						from LeetCode, GeeksForGeeks, and more.
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<div className="group relative flex items-center space-x-2 rounded-full border border-brand-primary/20 bg-surface-page/40 px-6 py-3 backdrop-blur-xl transition-all duration-500 hover:border-brand-primary/40 hover:bg-surface-page/60 hover:shadow-[0_0_2rem_-0.5rem_rgba(0,0,0,0.2)] cursor-pointer">
					<span
						onClick={() => router.push('/platform/leetcode')}
						className="text-base font-medium text-text-secondary transition-colors group-hover:text-text-primary"
					>
						Explore LeetLens
					</span>
					<BsArrowRight className="h-5 w-5 text-text-secondary transition-all duration-300 group-hover:translate-x-1 group-hover:text-text-primary" />
				</div>
			</div>
		</div>
	);
}
