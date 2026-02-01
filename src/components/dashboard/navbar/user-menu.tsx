'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { BiUser, BiLogOut } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

export const UserMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: session } = useSession();
	const isLoggedIn = !!session?.user;

	if (!isLoggedIn) {
		return (
			<Link href="/login">
				<button className="bg-primary whitespace-nowrap text-primary-foreground px-5 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:opacity-90 transition-opacity">
					Signup for free
				</button>
			</Link>
		);
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="outline-none flex items-center relative z-50"
			>
				{session.user?.image ? (
					<Image
						src={session.user.image}
						alt="Profile"
						width={40}
						height={40}
						className="rounded-full hover:opacity-80 transition-opacity"
					/>
				) : (
					<div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center text-primary-foreground">
						{session.user?.name?.[0] || 'U'}
					</div>
				)}
			</button>

			<AnimatePresence>
				{isOpen && (
					<>
						<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={{ duration: 0.2 }}
							className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-lg z-50 p-1"
						>
							<Link
								href="/profile"
								className="flex items-center gap-2 px-2 py-2 text-sm text-foreground hover:bg-accent rounded-sm cursor-pointer"
								onClick={() => setIsOpen(false)}
							>
								<BiUser className="h-4 w-4" />
								Profile
							</Link>
							<button
								onClick={() => signOut()}
								className="w-full flex items-center gap-2 px-2 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-sm cursor-pointer"
							>
								<BiLogOut className="h-4 w-4" />
								Logout
							</button>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};
