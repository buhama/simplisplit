import React from 'react';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface Props {
	direction: 'left' | 'right';
	loading?: boolean;
	icon?: React.ReactElement;
	buttonSizeIsIcon?: boolean;
}

const ButtonIcons: React.FC<Props> = ({
	direction,
	loading,
	icon,
	buttonSizeIsIcon = false,
}) => {
	if (loading) {
		return (
			<LoaderCircle
				className={cn(
					'animate-spin py-1',
					direction === 'left' ? 'mr-1' : 'ml-1',
					buttonSizeIsIcon && 'mx-0'
				)}
			/>
		);
	}
	if (icon) {
		return (
			<div
				className={cn(
					direction === 'left' ? 'pr-2' : 'pl-2',
					buttonSizeIsIcon && 'px-0'
				)}
			>
				{icon}
			</div>
		);
	}
};

export default ButtonIcons;
