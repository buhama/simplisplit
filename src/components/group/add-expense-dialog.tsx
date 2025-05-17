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
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ExpenseCategories } from '@/models/Expense';
import { GroupMember } from '@/models/Group';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createExpense } from '@/actions/expense';
import { toast } from 'sonner';

const formSchema = z.object({
	description: z.string().min(1, 'Description is required'),
	amount: z.string().min(1, 'Amount is required'),
	paidBy: z.string().min(1, 'Paid by is required'),
	category: z.string().optional(),
	notes: z.string().optional(),
});

interface AddExpenseDialogProps {
	groupId: string;
	members: GroupMember[];
}

type FormValues = z.infer<typeof formSchema>;

export function AddExpenseDialog({ groupId, members }: AddExpenseDialogProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: '',
			amount: '',
			paidBy: '',
			category: '',
			notes: '',
		},
	});

	const onSubmit = async (values: FormValues) => {
		try {
			await createExpense({
				groupId,
				description: values.description,
				amount: parseFloat(values.amount),
				paidBy: values.paidBy,
				category: values.category || undefined,
				notes: values.notes || undefined,
			});

			toast.success('Expense added successfully');
			form.reset();
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('Failed to add expense');
			}
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className='mr-1 h-4 w-4' />
					Add expense
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add an expense</DialogTitle>
					<DialogDescription>
						Add a new expense to split with the group.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder='Dinner at restaurant' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='amount'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type='number'
											step='0.01'
											min='0'
											placeholder='0.00'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='paidBy'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Paid by</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select who paid' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{members.map((member) => (
												<SelectItem key={member.id} value={member.id}>
													{member.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category (optional)</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='w-full'>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{ExpenseCategories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='notes'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Notes (optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Any additional details...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type='submit' loading={form.formState.isSubmitting}>
								Add expense
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
