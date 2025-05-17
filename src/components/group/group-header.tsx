'use client';

import { Group, GroupMember } from '@/models/Group';
import { AddExpenseDialog } from './add-expense-dialog';
import { InviteMemberDialog } from './invite-member-dialog';
import { SettingsIcon, Users2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GroupHeaderProps {
	group: Group;
	totalMembers: number;
	members: GroupMember[];
}

export function GroupHeader({
	group,
	totalMembers,
	members,
}: GroupHeaderProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className='border-b bg-white'
		>
			<div className='container mx-auto py-6 px-4 max-w-7xl'>
				<div className='flex items-start justify-between'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h1 className='text-2xl font-medium text-gray-900 font-mono'>
							{group.name}
						</h1>
						{group.description && (
							<p className='mt-2 text-sm text-gray-600 font-mono'>
								{group.description}
							</p>
						)}
						<div className='mt-3 flex items-center text-sm text-gray-500 font-mono'>
							<Users2Icon className='h-4 w-4 mr-1.5' />
							<span>
								{totalMembers} {totalMembers === 1 ? 'member' : 'members'}
							</span>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className='flex items-center gap-3'
					>
						<InviteMemberDialog groupId={group.id} />
						<Button
							variant='outline'
							size='sm'
							className='hidden sm:flex hover:bg-gray-50 font-mono'
						>
							<SettingsIcon className='mr-1.5 h-4 w-4' />
							Settings
						</Button>
						<AddExpenseDialog groupId={group.id} members={members} />
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
}
