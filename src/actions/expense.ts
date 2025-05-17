'use server';

import { createSuperAdminClient } from '@/lib/supabase/super-admin';
import { getRandomId } from '@/lib/string/string';
import { getTodaysDate } from '@/lib/date/date';
import { revalidatePath } from 'next/cache';

interface CreateExpenseParams {
	groupId: string;
	description: string;
	amount: number;
	paidBy: string;
	category?: string;
	notes?: string;
}

export async function createExpense({
	groupId,
	description,
	amount,
	paidBy,
	category,
	notes,
}: CreateExpenseParams) {
	const supabase = createSuperAdminClient();

	// First verify that the group and member exist
	const { data: group, error: groupError } = await supabase
		.from('groups')
		.select('id')
		.eq('id', groupId)
		.single();

	if (groupError || !group) {
		throw new Error('Group not found');
	}

	const { data: member, error: memberError } = await supabase
		.from('group_members')
		.select('id')
		.eq('id', paidBy)
		.eq('group_id', groupId)
		.single();

	if (memberError || !member) {
		throw new Error('Member not found');
	}

	// Create the expense
	const now = getTodaysDate();
	const { error: expenseError } = await supabase.from('expenses').insert({
		id: getRandomId(),
		group_id: groupId,
		description,
		amount,
		currency: 'USD', // Hardcoded for now, could be made configurable
		paid_by: paidBy,
		category,
		notes,
		created_at: now,
		updated_at: now,
	});

	if (expenseError) {
		throw new Error('Failed to create expense');
	}

	// Revalidate the group page
	revalidatePath(`/group/${groupId}`);
}
