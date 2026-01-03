'use client';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

export const ThemeSwitch = () => {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
			className="relative p-2 rounded-md hover:bg-accent transition-colors"
		>
			<BiSun className="h-5 w-5 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
			<BiMoon className="absolute top-2 left-2 h-5 w-5 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
		</button>
	);
};
