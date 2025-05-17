import { GroupMember } from '@/models/Group';
import { Balance } from '@/models/Expense';
import { cn } from '@/lib/utils';

interface MemberBalancesProps {
	members: (GroupMember & { balance: Balance })[];
}

export function MemberBalances({ members }: MemberBalancesProps) {
	return (
		<div className='rounded-lg border bg-card'>
			<div className='p-6'>
				<h2 className='text-lg font-semibold text-gray-900'>Member Balances</h2>
				<div className='mt-4 space-y-4'>
					{members.map((member) => (
						<div
							key={member.id}
							className='flex items-center justify-between py-2'
						>
							<div className='flex items-center'>
								<div className='h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center'>
									<span className='text-sm font-medium text-emerald-700'>
										{member.name.charAt(0).toUpperCase()}
									</span>
								</div>
								<span className='ml-3 text-sm font-medium text-gray-900'>
									{member.name}
								</span>
							</div>
							<div className='text-right'>
								<span
									className={cn(
										'text-sm font-medium',
										member.balance.net_balance > 0
											? 'text-green-600'
											: member.balance.net_balance < 0
											? 'text-red-600'
											: 'text-gray-500'
									)}
								>
									{member.balance.net_balance > 0 ? '+' : ''}$
									{Math.abs(member.balance.net_balance).toFixed(2)}
								</span>
								<p className='text-xs text-gray-500'>
									{member.balance.net_balance > 0
										? 'gets back'
										: member.balance.net_balance < 0
										? 'owes'
										: 'settled up'}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
