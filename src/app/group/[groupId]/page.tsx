import { createSuperAdminClient } from '@/lib/supabase/super-admin';
import { notFound } from 'next/navigation';
import { GroupPageContent } from '@/components/group/group-page-content';

export const dynamic = 'force-dynamic';

export default async function GroupPage({
	params,
}: {
	params: Promise<{
		groupId: string;
	}>;
}) {
	const { groupId } = await params;
	const supabase = createSuperAdminClient();

	// Fetch group data
	const { data: group, error: groupError } = await supabase
		.from('groups')
		.select('*')
		.eq('id', groupId)
		.single();

	if (groupError || !group) {
		console.error(groupError);
		return notFound();
	}

	// Fetch group members
	const { data: membersData, error: membersError } = await supabase
		.from('group_members')
		.select('*')
		.eq('group_id', groupId);

	if (membersError || !membersData) {
		console.error(membersError);
		return <div>Error loading group members</div>;
	}

	const members = membersData;

	// Fetch expenses
	const { data: expensesData, error: expensesError } = await supabase
		.from('expenses')
		.select('*')
		.eq('group_id', groupId)
		.order('created_at', { ascending: false });

	if (expensesError || !expensesData) {
		console.error(expensesError);
		return <div>Error loading expenses</div>;
	}

	const expenses = expensesData;

	// Fetch settlements
	const { data: settlementsData, error: settlementsError } = await supabase
		.from('settlements')
		.select('*')
		.eq('group_id', groupId)
		.order('created_at', { ascending: false });

	if (settlementsError || !settlementsData) {
		console.error(settlementsError);
		return <div>Error loading settlements</div>;
	}

	const settlements = settlementsData;

	return (
		<GroupPageContent
			group={group}
			members={members}
			expenses={expenses}
			settlements={settlements}
		/>
	);
};
