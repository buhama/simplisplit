'use client';

import { Group, GroupMember } from '@/models/Group';
import { Balance, Expense, Settlement } from '@/models/Expense';
import { JoinGroupDialog } from '@/components/group/join-group-dialog';
import { useState, useEffect } from 'react';
import { GroupHeader } from './group-header';
import { ActivityFeed } from './activity-feed';
import { MemberBalances } from './member-balances';
import { loadLocalMember } from '@/lib/local-members/local-members';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import * as RechartsPrimitive from 'recharts';

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
			<div className='relative flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]'>
				<div className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
					<main className='flex-1'>
						<div className='flex w-full items-center justify-center'>
							<div className='w-full max-w-[1500px] min-h-screen flex flex-col'>
								<div className='border-x border-neutral-100 mx-2 sm:mx-4 md:mx-8 lg:mx-24 xl:mx-32'>
									<main className='flex w-full flex-col'>
										<div>
											<div className='h-full w-full'>
												<div className='relative min-h-[80vh] w-full pt-12 sm:pt-16'>
													<div className='absolute left-4 font-mono sm:left-8 top-12 sm:top-16 flex flex-col items-start'>
														<div>
															<h1 className='text-6xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-medium text-emerald-700 whitespace-pre-line'>
																{group.name}
															</h1>
															{group.description && (
																<p className='mt-4 text-lg text-emerald-600 font-mono'>
																	{group.description}
																</p>
															)}
														</div>
													</div>
													<div className='absolute bottom-8 left-4 sm:left-8 flex flex-col items-start gap-2'>
														<div className='text-md sm:text-lg text-emerald-700 font-mono'>
															Join {members.length} other{' '}
															{members.length === 1 ? 'member' : 'members'} in
															tracking shared expenses
														</div>
														<button
															onClick={() => setShowJoinDialog(true)}
															className='mt-4 font-mono inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-700 text-white hover:bg-emerald-600 h-10 px-4 py-2'
														>
															Join now
														</button>
													</div>
												</div>
											</div>
										</div>
									</main>
								</div>
							</div>
						</div>
					</main>
				</div>
				<JoinGroupDialog
					group={group}
					open={showJoinDialog}
					onOpenChange={setShowJoinDialog}
				/>
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
		<div className='min-h-screen bg-gray-50'>
			<GroupHeader
				group={group}
				totalMembers={members.length}
				members={members}
			/>
			<div className='container mx-auto py-8 px-4'>
				{/* Financial Overview */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
					<div className='bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6'>
						<h3 className='text-sm font-medium text-gray-500'>Total Balance</h3>
						<p className='mt-2 text-3xl font-semibold text-gray-900'>
							${totalExpenses.toFixed(2)}
						</p>
						<p className='text-sm text-gray-500 mt-1'>All time</p>
					</div>
					<div className='bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6'>
						<h3 className='text-sm font-medium text-gray-500'>
							Monthly Spending
						</h3>
						<p className='mt-2 text-3xl font-semibold text-gray-900'>
							${monthlyExpenses.toFixed(2)}
						</p>
						<p className='text-sm text-gray-500 mt-1'>This month</p>
					</div>
					{currentUserBalance && (
						<>
							<div className='bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6'>
								<h3 className='text-sm font-medium text-gray-500'>
									You are owed
								</h3>
								<p className='mt-2 text-3xl font-semibold text-emerald-600'>
									${youAreOwed.toFixed(2)}
								</p>
								<p className='text-sm text-gray-500 mt-1'>To be collected</p>
							</div>
							<div className='bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-6'>
								<h3 className='text-sm font-medium text-gray-500'>You owe</h3>
								<p className='mt-2 text-3xl font-semibold text-red-600'>
									${youOwe.toFixed(2)}
								</p>
								<p className='text-sm text-gray-500 mt-1'>To be paid</p>
							</div>
						</>
					)}
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
					<div className='lg:col-span-2'>
						<ActivityFeed activities={activities} members={membersById} />
					</div>
					<div>
						<MemberBalances members={membersWithBalances} />
					</div>
				</div>
				{/* Monthly Overview Chart */}
				<div className='bg-white rounded-lg border shadow-sm p-6 mb-8'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-lg font-semibold text-gray-900'>
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
										light: '#059669',
										dark: '#059669',
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
									stroke='#059669'
									fill='#059669'
									fillOpacity={0.1}
									strokeWidth={2}
								/>
							</RechartsPrimitive.AreaChart>
						</ChartContainer>
					</div>
				</div>
			</div>
		</div>
	);
}
