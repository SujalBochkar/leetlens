import { Button } from '@/components/ui/button';
import { IconType } from 'react-icons';

interface ActionButtonProps {
	Icon: IconType;
	onClick?: () => void;
}

export default function LcActionButton({ Icon, onClick }: ActionButtonProps) {
	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-8 w-8 text-text-tertiary hover:text-text-primary"
			onClick={onClick}
		>
			<Icon className="h-4 w-4" />
		</Button>
	);
}
