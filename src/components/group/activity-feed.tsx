import { Expense, Settlement } from '@/models/Expense';
import { GroupMember } from '@/models/Group';
import { format } from 'date-fns';
import { ArrowRightIcon, DollarSignIcon, RefreshCwIcon } from 'lucide-react';

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
		<div className='rounded-lg border bg-card'>
			<div className='p-6'>
				<h2 className='text-lg font-semibold text-gray-900'>Recent Activity</h2>
				<div className='mt-4 space-y-4'>
					{sortedActivities.map((activity) => (
						<div
							key={
								activity.type +
								(activity.type === 'expense'
									? activity.data.id
									: activity.data.id)
							}
							className='flex items-start gap-4 py-3'
						>
							<div
								className={`mt-1 rounded-full p-2 ${
									activity.type === 'expense'
										? 'bg-emerald-100 text-emerald-600'
										: 'bg-blue-100 text-blue-600'
								}`}
							>
								{activity.type === 'expense' ? (
									<DollarSignIcon className='h-4 w-4' />
								) : (
									<RefreshCwIcon className='h-4 w-4' />
								)}
							</div>
							<div className='flex-1 space-y-1'>
								{activity.type === 'expense' ? (
									<>
										<p className='text-sm text-gray-900'>
											<span className='font-medium'>
												{members[activity.data.paid_by]?.name}
											</span>{' '}
											paid{' '}
											<span className='font-medium'>
												${activity.data.amount.toFixed(2)}
											</span>{' '}
											for {activity.data.description}
										</p>
										{activity.data.category && (
											<p className='text-xs text-gray-500'>
												Category: {activity.data.category}
											</p>
										)}
									</>
								) : (
									<p className='text-sm text-gray-900'>
										<span className='font-medium'>
											{members[activity.data.payer_id]?.name}
										</span>{' '}
										<ArrowRightIcon className='inline h-3 w-3 mx-1' />{' '}
										<span className='font-medium'>
											{members[activity.data.receiver_id]?.name}
										</span>{' '}
										settled{' '}
										<span className='font-medium'>
											${activity.data.amount.toFixed(2)}
										</span>
									</p>
								)}
								<p className='text-xs text-gray-500'>
									{format(activity.date, 'MMM d, yyyy h:mm a')}
								</p>
							</div>
						</div>
					))}
					{sortedActivities.length === 0 && (
						<p className='text-sm text-gray-500 text-center py-4'>
							No recent activity
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
