'use client';

import { Group, GroupMember } from '@/models/Group';
import { Balance, Expense, Settlement } from '@/models/Expense';
import { JoinGroupDialog } from '@/components/group/join-group-dialog';
import { useState, useEffect } from 'react';
import { GroupHeader } from './group-header';
import { ActivityFeed } from './activity-feed';
import { MemberBalances } from './member-balances';
import { loadLocalMember } from '@/lib/local-members/local-members';

interface GroupPageContentProps {
	group: Group;
	members: GroupMember[];
	expenses: Expense[];
	settlements: Settlement[];
}

export function GroupPageContent({
	group,
	members,
	expenses,
	settlements,
}: GroupPageContentProps) {
	const [showJoinDialog, setShowJoinDialog] = useState(false);
	const [localMember, setLocalMember] = useState<{
		memberId: string;
		name: string;
	} | null>(null);

	useEffect(() => {
		const member = loadLocalMember(group.id);
		setLocalMember(member);
	}, [group.id]);

	console.log('localMember', localMember);
	console.log('members', members);

	// Check if user is already a member
	const isMember =
		localMember && members.some((m) => m.id === localMember.memberId);

	// If not a member, show join dialog
	if (!isMember) {
		return (
			<div className='min-h-screen bg-gray-50'>
				<div className='container mx-auto py-8 px-4'>
					<div className='max-w-md mx-auto'>
						<h1 className='text-2xl font-semibold text-gray-900 mb-4'>
							{group.name}
						</h1>
						{group.description && (
							<p className='text-sm text-gray-500 mb-6'>{group.description}</p>
						)}
						<div className='text-center'>
							<button
								onClick={() => setShowJoinDialog(true)}
								className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
							>
								Join Group
							</button>
						</div>
						<JoinGroupDialog
							group={group}
							open={showJoinDialog}
							onOpenChange={setShowJoinDialog}
						/>
					</div>
				</div>
			</div>
		);
	}

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
}
