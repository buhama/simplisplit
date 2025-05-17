import { createSuperAdminClient } from '@/lib/supabase/super-admin';
import { GroupHeader } from '@/components/group/group-header';
import { MemberBalances } from '@/components/group/member-balances';
import { ActivityFeed } from '@/components/group/activity-feed';
import { Balance, Expense, Settlement } from '@/models/Expense';
import { notFound } from 'next/navigation';

const GroupPage = async ({ params }: { params: { groupId: string } }) => {
	const supabase = createSuperAdminClient();

	// Fetch group data
	const { data: group, error: groupError } = await supabase
		.from('groups')
		.select('*')
		.eq('id', params.groupId)
		.single();

	if (groupError || !group) {
		console.error(groupError);
		return notFound();
	}

	// Fetch group members
	const { data: membersData, error: membersError } = await supabase
		.from('group_members')
		.select('*')
		.eq('group_id', params.groupId);

	if (membersError || !membersData) {
		console.error(membersError);
		return <div>Error loading group members</div>;
	}

	const members = membersData;

	// Fetch expenses
	const { data: expensesData, error: expensesError } = await supabase
		.from('expenses')
		.select('*')
		.eq('group_id', params.groupId)
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
		.eq('group_id', params.groupId)
		.order('created_at', { ascending: false });

	if (settlementsError || !settlementsData) {
		console.error(settlementsError);
		return <div>Error loading settlements</div>;
	}

	const settlements = settlementsData;

	// Calculate member balances
	const memberBalances: Record<string, Balance> = {};

	// Initialize balances
	members.forEach((member) => {
		memberBalances[member.id] = {
			member_id: member.id,
			total_paid: 0,
			total_owed: 0,
			net_balance: 0,
		};
	});

	// Add expenses to balances
	expenses.forEach((expense: Expense) => {
		// Add to payer's total paid
		if (memberBalances[expense.paid_by]) {
			memberBalances[expense.paid_by].total_paid += expense.amount;
		}

		// Split expense equally among members
		const splitAmount = expense.amount / members.length;
		members.forEach((member) => {
			if (memberBalances[member.id]) {
				memberBalances[member.id].total_owed += splitAmount;
			}
		});
	});

	// Add settlements to balances
	settlements.forEach((settlement: Settlement) => {
		if (settlement.status === 'completed') {
			if (memberBalances[settlement.payer_id]) {
				memberBalances[settlement.payer_id].total_paid += settlement.amount;
			}
			if (memberBalances[settlement.receiver_id]) {
				memberBalances[settlement.receiver_id].total_owed += settlement.amount;
			}
		}
	});

	// Calculate net balances
	Object.values(memberBalances).forEach((balance) => {
		balance.net_balance = balance.total_paid - balance.total_owed;
	});

	// Combine members with their balances
	const membersWithBalances = members.map((member) => ({
		...member,
		balance: memberBalances[member.id],
	}));

	// Combine expenses and settlements for activity feed
	const activities = [
		...expenses.map((expense) => ({
			type: 'expense' as const,
			data: expense,
			date: expense.created_at,
		})),
		...settlements.map((settlement) => ({
			type: 'settlement' as const,
			data: settlement,
			date: settlement.created_at,
		})),
	];

	const membersById = Object.fromEntries(
		members.map((member) => [member.id, member])
	);

	return (
		<div className='min-h-screen bg-gray-50'>
			<GroupHeader
				group={group}
				totalMembers={members.length}
				members={members}
			/>
			<div className='container mx-auto py-8 px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-2'>
						<ActivityFeed activities={activities} members={membersById} />
					</div>
					<div>
						<MemberBalances members={membersWithBalances} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupPage;
