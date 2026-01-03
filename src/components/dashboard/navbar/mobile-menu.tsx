import { BiMenu } from 'react-icons/bi';

export const MobileMenu = () => (
	<button className="md:hidden p-2.5 hover:bg-accent rounded-md transition-colors">
		<BiMenu className="md:hidden h-5 w-5" />
	</button>
);
