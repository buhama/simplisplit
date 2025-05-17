'use client';

import { Group, GroupMember } from '@/models/Group';
import { Balance, Expense, Settlement } from '@/models/Expense';
import { useState, useEffect } from 'react';
import { GroupHeader } from './group-header';
import { ActivityFeed } from './activity-feed';
import { MemberBalances } from './member-balances';
import { loadLocalMember } from '@/lib/local-members/local-members';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import * as RechartsPrimitive from 'recharts';
import JoinGroupContent from './join-group-content';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { TransferMember } from './transfer-member';

interface GroupPageContentProps {
	group: Group;
	members: GroupMember[];
	expenses: Expense[];
	settlements: Settlement[];
}

interface MonthlyExpense {
	month: string;
	amount: number;
}

export function GroupPageContent({
	group,
	members,
	expenses,
	settlements,
}: GroupPageContentProps) {
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
		return <JoinGroupContent group={group} members={members} />;
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

	// Calculate total balance and personal balances
	const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
	const monthlyExpenses = expenses
		.filter((exp) => {
			const date = new Date(exp.created_at);
			const now = new Date();
			return (
				date.getMonth() === now.getMonth() &&
				date.getFullYear() === now.getFullYear()
			);
		})
		.reduce((sum, exp) => sum + exp.amount, 0);

	// Get current user's balances
	const currentUserBalance = localMember
		? memberBalances[localMember.memberId]
		: null;
	const youOwe = currentUserBalance?.total_owed || 0;
	const youAreOwed = currentUserBalance?.total_paid || 0;

	// Monthly expense data for chart
	const monthlyData = expenses.reduce((acc: MonthlyExpense[], exp) => {
		const date = new Date(exp.created_at);
		const monthYear = `${date.toLocaleString('default', {
			month: 'short',
		})} ${date.getFullYear()}`;

		// Find or create month entry
		let monthEntry = acc.find((item) => item.month === monthYear);
		if (!monthEntry) {
			monthEntry = { month: monthYear, amount: 0 };
			acc.push(monthEntry);
		}
		monthEntry.amount += exp.amount;
		return acc;
	}, []);

	// Ensure we have entries for the last 6 months
	const now = new Date();
	const last6Months = Array.from({ length: 6 }, (_, i) => {
		const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
		return `${date.toLocaleString('default', {
			month: 'short',
		})} ${date.getFullYear()}`;
	}).reverse();

	const filledMonthlyData = last6Months.map((month) => ({
		month,
		amount: monthlyData.find((data) => data.month === month)?.amount || 0,
	}));

	return (
		<div className='min-h-screen bg-[#fafafa]'>
			<GroupHeader
				group={group}
				totalMembers={members.length}
				members={members}
			/>
			<div className='container mx-auto py-8 px-4 max-w-7xl'>
				{/* Financial Summary */}
				{currentUserBalance && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='mb-12'
					>
						<div className='flex flex-col md:flex-row gap-8 items-start'>
							<div className='flex-1 space-y-2'>
								<h2 className='text-sm font-medium text-gray-500'>
									Your Balance
								</h2>
								<div className='flex items-baseline gap-3'>
									<p
										className={`text-4xl font-mono ${
											currentUserBalance.net_balance >= 0
												? 'text-emerald-600'
												: 'text-red-600'
										}`}
									>
										${Math.abs(currentUserBalance.net_balance).toFixed(2)}
									</p>
									<div
										className={`flex items-center gap-1 text-sm ${
											currentUserBalance.net_balance >= 0
												? 'text-emerald-600'
												: 'text-red-600'
										}`}
									>
										{currentUserBalance.net_balance >= 0 ? (
											<>
												<ArrowUpIcon className='h-4 w-4' />
												<span>you are owed</span>
											</>
										) : (
											<>
												<ArrowDownIcon className='h-4 w-4' />
												<span>you owe</span>
											</>
										)}
									</div>
								</div>
							</div>
							<div className='flex gap-12 items-end text-sm'>
								<div>
									<p className='text-gray-500 mb-1'>Monthly Spending</p>
									<p className='font-mono text-2xl'>
										${monthlyExpenses.toFixed(2)}
									</p>
								</div>
								<div>
									<p className='text-gray-500 mb-1'>Total Group Spend</p>
									<p className='font-mono text-2xl'>
										${totalExpenses.toFixed(2)}
									</p>
								</div>
								<div className='flex gap-6 text-sm'>
									<div>
										<p className='text-gray-500 mb-1'>You&apos;ve Paid</p>
										<p className='font-mono text-lg text-emerald-600'>
											${youAreOwed.toFixed(2)}
										</p>
									</div>
									<div>
										<p className='text-gray-500 mb-1'>Your Share</p>
										<p className='font-mono text-lg text-red-600'>
											${youOwe.toFixed(2)}
										</p>
									</div>
								</div>
								{localMember && (
									<TransferMember
										groupId={group.id}
										memberId={localMember.memberId}
									/>
								)}
							</div>
						</div>
					</motion.div>
				)}

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
					<div className='lg:col-span-2 space-y-8'>
						{/* Monthly Overview Chart */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='bg-white rounded-lg border shadow-sm p-6'
						>
							<div className='flex items-center justify-between mb-6'>
								<h2 className='text-lg font-medium text-gray-900'>
									Monthly Overview
								</h2>
								<div className='text-sm text-gray-500'>Last 6 months</div>
							</div>
							<div className='w-full'>
								<ChartContainer
									config={{
										expenses: {
											label: 'Monthly Expenses',
											theme: {
												light: '#374151',
												dark: '#374151',
											},
										},
									}}
								>
									<RechartsPrimitive.AreaChart
										data={filledMonthlyData}
										margin={{ top: 5, right: 5, left: 40, bottom: 20 }}
									>
										<RechartsPrimitive.XAxis
											dataKey='month'
											tick={{ fill: '#6B7280', fontSize: 11 }}
											tickLine={{ stroke: '#6B7280' }}
											axisLine={{ stroke: '#E5E7EB' }}
											dy={10}
										/>
										<RechartsPrimitive.YAxis
											tick={{ fill: '#6B7280', fontSize: 11 }}
											tickLine={{ stroke: '#6B7280' }}
											axisLine={{ stroke: '#E5E7EB' }}
											tickFormatter={(value) => `$${value}`}
											width={35}
										/>
										<RechartsPrimitive.CartesianGrid
											strokeDasharray='3 3'
											stroke='#E5E7EB'
											opacity={0.5}
										/>
										<RechartsPrimitive.Tooltip
											content={<ChartTooltipContent />}
											cursor={{ stroke: '#6B7280', strokeWidth: 1 }}
										/>
										<RechartsPrimitive.Area
											type='monotone'
											dataKey='amount'
											name='expenses'
											stroke='#374151'
											fill='#374151'
											fillOpacity={0.1}
											strokeWidth={2}
										/>
									</RechartsPrimitive.AreaChart>
								</ChartContainer>
							</div>
						</motion.div>

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
