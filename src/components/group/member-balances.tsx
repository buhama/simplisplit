import { GroupMember } from '@/models/Group';
import { Balance } from '@/models/Expense';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TrendingDownIcon, TrendingUpIcon, MinusIcon } from 'lucide-react';

interface MemberBalancesProps {
	members: (GroupMember & { balance: Balance })[];
}

export function MemberBalances({ members }: MemberBalancesProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className='rounded-lg border bg-white shadow-sm'
		>
			<div className='p-6'>
				<h2 className='text-lg font-medium text-gray-900 font-mono'>
					Member Balances
				</h2>
				<div className='mt-6 space-y-4'>
					{members.map((member, index) => (
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							key={member.id}
							className='flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors'
						>
							<div className='flex items-center'>
								<div className='h-8 w-8 rounded-full bg-emerald-50 flex items-center justify-center'>
									<span className='text-sm font-medium text-emerald-700 font-mono'>
										{member.name.charAt(0).toUpperCase()}
									</span>
								</div>
								<span className='ml-3 text-sm font-medium text-gray-900 font-mono'>
									{member.name}
								</span>
							</div>
							<div className='text-right flex items-center gap-3'>
								<div
									className={cn(
										'flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono',
										member.balance.net_balance > 0
											? 'bg-emerald-50 text-emerald-700'
											: member.balance.net_balance < 0
											? 'bg-red-50 text-red-700'
											: 'bg-gray-100 text-gray-600'
									)}
								>
									{member.balance.net_balance > 0 ? (
										<TrendingUpIcon className='h-3.5 w-3.5' />
									) : member.balance.net_balance < 0 ? (
										<TrendingDownIcon className='h-3.5 w-3.5' />
									) : (
										<MinusIcon className='h-3.5 w-3.5' />
									)}
									<span>
										{member.balance.net_balance > 0 ? '+' : ''}$
										{Math.abs(member.balance.net_balance).toFixed(2)}
									</span>
								</div>
								<p
									className={cn(
										'text-xs min-w-[60px] text-left font-mono',
										member.balance.net_balance > 0
											? 'text-emerald-600'
											: member.balance.net_balance < 0
											? 'text-red-600'
											: 'text-gray-500'
									)}
								>
									{member.balance.net_balance > 0
										? 'gets back'
										: member.balance.net_balance < 0
										? 'owes'
										: 'settled up'}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
