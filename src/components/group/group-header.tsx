'use client';

import { Group, GroupMember } from '@/models/Group';
import { AddExpenseDialog } from './add-expense-dialog';
import { InviteMemberDialog } from './invite-member-dialog';
import { SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
		<div className='border-b'>
			<div className='container mx-auto py-6 px-4'>
				<div className='flex items-start justify-between'>
					<div>
						<h1 className='text-2xl font-semibold text-gray-900'>
							{group.name}
						</h1>
						{group.description && (
							<p className='mt-1 text-sm text-gray-500'>{group.description}</p>
						)}
						<div className='mt-2 flex items-center text-sm text-gray-500'>
							<span>
								{totalMembers} {totalMembers === 1 ? 'member' : 'members'}
							</span>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<InviteMemberDialog groupId={group.id} />
						<Button variant='outline' size='sm' className='hidden sm:flex'>
							<SettingsIcon className='mr-1 h-4 w-4' />
							Settings
						</Button>
						<AddExpenseDialog groupId={group.id} members={members} />
					</div>
				</div>
			</div>
		</div>
	);
}
