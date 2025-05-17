'use server';

import { createSuperAdminClient } from '@/lib/supabase/super-admin';
import { getRandomId } from '@/lib/string/string';
import { getTodaysDate } from '@/lib/date/date';
import { revalidatePath } from 'next/cache';

interface InviteMemberParams {
	groupId: string;
	name: string;
}

export async function inviteMember({ groupId, name }: InviteMemberParams) {
	const supabase = createSuperAdminClient();

	// First verify that the group exists
	const { data: group, error: groupError } = await supabase
		.from('groups')
		.select('id')
		.eq('id', groupId)
		.single();

	if (groupError || !group) {
		throw new Error('Group not found');
	}

	// Create the member
	const now = getTodaysDate();
	const memberId = getRandomId();
	const { error: memberError } = await supabase.from('group_members').insert({
		id: memberId,
		group_id: groupId,
		name,
		created_at: now,
		updated_at: now,
	});

	if (memberError) {
		throw new Error('Failed to add member');
	}

	// Revalidate the group page
	revalidatePath(`/group/${groupId}`);

	return { memberId };
}
