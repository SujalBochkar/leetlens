import { IoMdCode } from 'react-icons/io';
import { LuBrainCircuit, LuSword } from 'react-icons/lu';
import { BiBookOpen, BiCalendar } from 'react-icons/bi';
import { PiGraduationCap } from 'react-icons/pi';

export const platformsDropdown = [
	{
		name: 'LeetCode',
		href: '/platform/leetcode',
		description: 'Practice coding problems',
		icon: IoMdCode,
	},
	{
		name: 'Coding Ninjas',
		href: '/platform/coding-ninjas',
		description: 'Coding courses and problems',
		icon: LuSword,
	},
	{
		name: 'GeeksforGeeks',
		href: '/platform/geeksforgeeks',
		description: 'Computer science portal',
		icon: BiBookOpen,
	},
];

export const dsaSheetsDropdown = [
	{
		name: 'NeetCode',
		href: '/sheets/neetcode',
		description: 'NeetCode 150 roadmap',
		icon: LuBrainCircuit,
	},
	{
		name: 'Striver',
		href: '/sheets/striver',
		description: 'Striver A2Z DSA Sheet',
		icon: PiGraduationCap,
	},
];

export const resourcesDropdown = [
	{
		name: 'Events',
		href: '/resources/events',
		description: 'Tech events and hackathons',
		icon: BiCalendar,
	},
];
