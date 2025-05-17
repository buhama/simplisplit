'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMember } from '@/actions/member';
import { toast } from 'sonner';
import { Group } from '@/models/Group';
import { saveMember } from '@/lib/local-members/local-members';
import { ArrowRightIcon } from 'lucide-react';

const formSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	passcode: z.string().length(6).optional(),
});

interface JoinGroupDialogProps {
	group: Group;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function JoinGroupDialog({
	group,
	open,
	onOpenChange,
}: JoinGroupDialogProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			passcode: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			// Verify passcode if required
			if (group.passcode && values.passcode !== group.passcode) {
				form.setError('passcode', {
					type: 'manual',
					message: 'Incorrect passcode',
				});
				return;
			}

			// Create member
			const { memberId } = await inviteMember({
				groupId: group.id,
				name: values.name,
			});

			// Save member info to local storage
			saveMember(group.id, memberId, values.name);

			toast.success('Successfully joined the group');
			form.reset();
			onOpenChange(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('Failed to join group');
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='font-[family-name:var(--font-geist-sans)]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-medium '>
						Join {group.name}
					</DialogTitle>
					<DialogDescription className=' font-mono'>
						Enter your name to join this group.
						{group.passcode && ' A passcode is required to join.'}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-mono'>Your name</FormLabel>
									<FormControl>
										<Input
											placeholder='John Doe'
											{...field}
											className='font-mono'
										/>
									</FormControl>
									<FormMessage className='text-red-500' />
								</FormItem>
							)}
						/>
						{group.passcode && (
							<FormField
								control={form.control}
								name='passcode'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='font-mono'>Passcode</FormLabel>
										<FormControl>
											<InputOTP
												maxLength={6}
												value={field.value || ''}
												onChange={field.onChange}
												className='gap-2'
											>
												<InputOTPGroup>
													{Array.from({ length: 6 }).map((_, index) => (
														<InputOTPSlot
															key={index}
															index={index}
															className='w-[48px] h-[48px]'
														/>
													))}
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>
						)}
						<DialogFooter>
							<Button type='submit' loading={form.formState.isSubmitting}>
								Join now <ArrowRightIcon className='ml-2 h-4 w-4' />
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
