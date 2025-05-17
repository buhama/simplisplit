import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:border focus-visible:border-secondary disabled:pointer-events-none disabled:opacity-50 transition-opacity group w-full sm:w-auto',
	{
		variants: {
			variant: {
				default:
					'text-white bg-emerald-700 hover:opacity-90 border border-emerald-700',
				destructive:
					'text-white bg-destructive hover:opacity-90 border border-destructive',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:opacity-90 border border-secondary',
				ghost:
					'hover:bg-accent hover:text-accent-foreground border border-transparent',
				link: 'text-primary underline-offset-4 hover:underline border-none',
			},
			size: {
				default: 'h-9 px-2 sm:px-3 py-2',
				sm: 'h-8 px-2 py-1.5',
				lg: 'h-10 px-3 sm:px-4 py-2',
				icon: 'h-9 w-9 p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
