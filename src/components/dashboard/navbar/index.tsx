import { NavLogo } from './nav-logo';
import { NavLinks } from './nav-links';
import { UserMenu } from './user-menu';
import { MobileMenu } from './mobile-menu';
import { ThemeSwitch } from './theme-switch';

const NavBar = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex items-center justify-between px-4 md:px-16 lg:px-52 py-5">
				<NavLogo />
				<NavLinks />
				<div className="flex items-center justify-end gap-4">
					<ThemeSwitch />
					<UserMenu />
					<MobileMenu />
				</div>
			</div>
		</header>
	);
};

export default NavBar;
