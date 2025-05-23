'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { createClient } from '@/lib/supabase/client';
import { Group, GroupMember } from '@/models/Group';
import { getRandomId } from '@/lib/string/string';
import { getTodaysDate } from '@/lib/date/date';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { saveMember } from '@/lib/local-members/local-members';

const formSchema = z.object({
	groupName: z.string().min(2).max(50),
	groupDescription: z.string().max(50),
	yourName: z.string().min(2).max(50),
	passcode: z.string().length(6).optional(),
});

interface CreateGroupProps {
	children: React.ReactNode;
}

const CreateGroup = ({ children }: CreateGroupProps) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			groupName: '',
			groupDescription: '',
			yourName: '',
			passcode: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			const supabase = createClient();

			// Create group
			const groupId = getRandomId();

			const newGroup: Group = {
				id: groupId,
				name: values.groupName,
				description: values.groupDescription,
				created_at: getTodaysDate(),
				updated_at: getTodaysDate(),
			};

			if (values.passcode) {
				newGroup.passcode = values.passcode;
			}

			const { error } = await supabase.from('groups').insert(newGroup).single();

			if (error) {
				throw new Error(error.message);
			}

			// Create member
			const memberId = getRandomId();
			const newGroupMember: GroupMember = {
				id: memberId,
				name: values.yourName,
				group_id: groupId,
				created_at: getTodaysDate(),
				updated_at: getTodaysDate(),
			};

			const { error: groupMemberError } = await supabase
				.from('group_members')
				.insert(newGroupMember)
				.single();

			if (groupMemberError) {
				throw new Error(groupMemberError.message);
			}

			// Save member info to local storage
			saveMember(groupId, memberId, values.yourName);

			toast.success('Group created successfully');
			router.push(`/group/${groupId}`);
		} catch (error) {
			if (error instanceof Error) {
				toast.error('Failed to create group: ' + error.message);
			} else {
				toast.error('Failed to create group');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a group</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					Create a group to track your shared expenses.
				</DialogDescription>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-4'>
							<FormField
								control={form.control}
								name='groupName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your group name</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='Camping trip 2025'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='groupDescription'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Group description (optional)</FormLabel>
										<FormControl>
											<Textarea
												placeholder='A fun trip to algonquin park'
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='yourName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>What should we call you?</FormLabel>
										<FormControl>
											<Input type='text' placeholder='John Doe' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex flex-col gap-4'>
								<FormField
									control={form.control}
									name='passcode'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Passcode (optional)</FormLabel>
											<FormControl>
												<InputOTP
													maxLength={6}
													value={field.value || ''}
													onChange={field.onChange}
												>
													<InputOTPGroup className='w-full justify-between'>
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
											<FormDescription className='text-sm text-muted-foreground'>
												Your group is already private and secure. Adding a
												passcode provides an extra layer of protection in case
												someone accidentally shares your group link.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button loading={loading} type='submit'>
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateGroup;
