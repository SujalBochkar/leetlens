export default function LandingGradientBg() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			{/* Glowing orbs */}
			<div className="animate-pulse-slow absolute -left-48 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
			<div className="animate-pulse-slow absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

			{/* Rotating borders */}
			{/* <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rotate-45 animate-spin-slower rounded-full border border-cyan-500/20" />
        <div className="absolute inset-0 -rotate-45 animate-spin-slower rounded-full border border-blue-500/20" />
      </div> */}
		</div>
	);
}
