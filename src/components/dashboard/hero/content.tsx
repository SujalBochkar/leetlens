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
				<h1 className="text-center md:max-w-6xl animate-fade-up text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-gray-900 to-cyan-500 dark:from-cyan-500 dark:to-gray-400 text-transparent bg-clip-text sm:text-6xl md:min-h-[180x]">
					<div>Master Company Specific DSA Questions</div>
				</h1>
				<div className="mt-4 text-muted-foreground sm:text-xl text-center mx-auto max-w-5xl dark:text-zinc-400">
					<div>
						Access curated collections of interview questions from top companies, along with
						structured DSA sheets. Practice, learn, and prepare with our company specific questions
						from LeetCode, GeeksForGeeks, and more.
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<div className="group relative flex items-center space-x-2 rounded-full border border-primary/20 bg-background/40 px-6 py-3 backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:bg-background/60 hover:shadow-[0_0_2rem_-0.5rem_rgba(0,0,0,0.2)] dark:border-zinc-700/50 dark:hover:border-zinc-700 dark:hover:shadow-[0_0_2rem_-0.5rem_#666] cursor-pointer">
					<span
						onClick={() => router.push('/platform/leetcode')}
						className="text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground dark:text-zinc-400 dark:group-hover:text-zinc-200"
					>
						Explore LeetLens
					</span>
					<BsArrowRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground dark:group-hover:text-zinc-200" />
				</div>
			</div>
		</div>
	);
}
