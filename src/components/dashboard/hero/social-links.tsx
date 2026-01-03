import { Button } from '@/components/ui/button';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

export default function LandingSocialLinks() {
	return (
		<div className="fixed bottom-8 right-8 flex space-x-4">
			<Button variant="ghost" size="icon" className="rounded-full">
				<BsGithub className="h-5 w-5" />
			</Button>
			<Button variant="ghost" size="icon" className="rounded-full">
				<BsTwitter className="h-5 w-5" />
			</Button>
			<Button variant="ghost" size="icon" className="rounded-full">
				<BsLinkedin className="h-5 w-5" />
			</Button>
		</div>
	);
}
