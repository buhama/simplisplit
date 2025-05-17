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
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowRightIcon } from 'lucide-react';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
	groupName: z.string().min(2).max(50),
	groupDescription: z.string().max(50),
});

const CreateGroup = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			groupName: '',
			groupDescription: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='mt-4 font-mono'>
					Start for free <ArrowRightIcon size={16} />
				</Button>
			</DialogTrigger>
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
						</div>
					</form>
				</Form>
				<DialogFooter>
					<Button>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateGroup;
