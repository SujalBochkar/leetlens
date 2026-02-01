'use client';

import { LeftPanel } from './left-panel';
import { RightPanel } from './right-panel';

const Login = () => {
	return (
		<div className="flex min-h-screen">
			{/* Left Panel - Brand & Visual (Hidden on mobile) */}
			<LeftPanel />

			{/* Right Panel - Auth Form */}
			<RightPanel />
		</div>
	);
};

export default Login;
