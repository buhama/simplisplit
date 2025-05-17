import { Expense, Settlement } from '@/models/Expense';
import { GroupMember } from '@/models/Group';
import { format } from 'date-fns';
import { ArrowRightIcon, DollarSignIcon, RefreshCwIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Activity = (
	| { type: 'expense'; data: Expense }
	| { type: 'settlement'; data: Settlement }
) & {
	date: number;
};

interface ActivityFeedProps {
	activities: Activity[];
	members: Record<string, GroupMember>;
}

export function ActivityFeed({ activities, members }: ActivityFeedProps) {
	const sortedActivities = [...activities].sort((a, b) => b.date - a.date);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className='rounded-lg border bg-white shadow-sm'
		>
			<div className='p-6'>
				<h2 className='text-lg font-medium text-gray-900 font-mono'>
					Recent Activity
				</h2>
				<div className='mt-6 divide-y divide-gray-100'>
					<AnimatePresence>
						{sortedActivities.map((activity, index) => (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
								key={
									activity.type +
									(activity.type === 'expense'
										? activity.data.id
										: activity.data.id)
								}
								className='flex items-start gap-4 py-4 hover:bg-gray-50 px-4 -mx-4 transition-colors'
							>
								<div
									className={`mt-1 rounded-full p-2 ${
										activity.type === 'expense'
											? 'bg-gray-100 text-gray-900'
											: 'bg-gray-100 text-gray-900'
									}`}
								>
									{activity.type === 'expense' ? (
										<DollarSignIcon className='h-4 w-4' />
									) : (
										<RefreshCwIcon className='h-4 w-4' />
									)}
								</div>
								<div className='flex-1 min-w-0'>
									{activity.type === 'expense' ? (
										<>
											<p className='text-sm text-gray-600 font-mono'>
												<span className='font-medium text-gray-900'>
													{members[activity.data.paid_by]?.name}
												</span>{' '}
												paid{' '}
												<span className='font-medium text-gray-900'>
													${activity.data.amount.toFixed(2)}
												</span>{' '}
												for{' '}
												<span className='font-medium text-gray-900'>
													{activity.data.description}
												</span>
											</p>
											{activity.data.category && (
												<span className='inline-flex mt-1 items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900 font-mono'>
													{activity.data.category}
												</span>
											)}
										</>
									) : (
										<p className='text-sm text-gray-600 font-mono'>
											<span className='font-medium text-gray-900'>
												{members[activity.data.payer_id]?.name}
											</span>{' '}
											<ArrowRightIcon className='inline h-3 w-3 mx-1 text-gray-400' />{' '}
											<span className='font-medium text-gray-900'>
												{members[activity.data.receiver_id]?.name}
											</span>{' '}
											settled{' '}
											<span className='font-medium text-gray-900'>
												${activity.data.amount.toFixed(2)}
											</span>
										</p>
									)}
									<p className='text-xs text-gray-500 mt-1 font-mono'>
										{format(activity.date, 'MMM d, yyyy h:mm a')}
									</p>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
					{sortedActivities.length === 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className='flex flex-col items-center justify-center py-12 text-center'
						>
							<div className='rounded-full bg-gray-100 p-3 mb-4'>
								<DollarSignIcon className='h-6 w-6 text-gray-600' />
							</div>
							<p className='text-sm text-gray-600 font-medium font-mono'>
								No recent activity
							</p>
							<p className='text-xs text-gray-500 mt-1 font-mono'>
								Add an expense to get started
							</p>
						</motion.div>
					)}
				</div>
			</div>
		</motion.div>
	);
}
