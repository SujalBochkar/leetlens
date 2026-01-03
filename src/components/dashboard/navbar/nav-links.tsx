'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiChevronDown } from 'react-icons/bi';
import { platformsDropdown, dsaSheetsDropdown, resourcesDropdown } from './helpers';

interface NavItemProps {
	label: string;
	items: typeof platformsDropdown;
}

const NavDropdown = ({ label, items }: NavItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<button className="flex items-center gap-1.5 whitespace-nowrap hover:text-foreground transition-colors py-2">
				{label}
				<motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
					<BiChevronDown className="h-3.5 w-3.5 opacity-50" />
				</motion.div>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						transition={{ duration: 0.2, ease: 'easeOut' }}
						className="absolute top-full left-0 mt-2 w-72 backdrop-blur-sm rounded-xl bg-popover border border-border shadow-lg overflow-hidden"
					>
						<div className="p-3 space-y-0.5">
							{items.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg transition-colors group/item"
								>
									<div className="mt-1 p-2 rounded-lg bg-muted group-hover/item:bg-primary/10 transition-colors">
										<div className="w-4 h-4 text-primary">
											<item.icon className="w-4 h-4" />
										</div>
									</div>
									<div>
										<div className="font-medium text-foreground group-hover/item:text-primary transition-colors">
											{item.name}
										</div>
										<div className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
											{item.description}
										</div>
									</div>
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export const NavLinks = () => {
	return (
		<nav className="hidden md:flex items-center justify-center md:gap-10 text-muted-foreground">
			<NavDropdown label="Platforms" items={platformsDropdown} />
			<Link href="/blogs" className="whitespace-nowrap hover:text-foreground transition-colors">
				Blogs
			</Link>
			<NavDropdown label="Trending DSA Sheets" items={dsaSheetsDropdown} />
			<NavDropdown label="Resources" items={resourcesDropdown} />
		</nav>
	);
};
