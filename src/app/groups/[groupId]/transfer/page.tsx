'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveMember } from '@/lib/local-members/local-members';
import { toast } from 'sonner';

export default function TransferPage({
	params,
}: {
	params: { groupId: string };
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const memberId = searchParams.get('memberId');

	useEffect(() => {
		if (!memberId) {
			toast.error('Invalid transfer link');
			router.push(`/groups/${params.groupId}`);
			return;
		}

		// Save the member to local storage
		// Note: We need to get the member's name from somewhere
		// For now, we'll use a placeholder name
		saveMember(params.groupId, memberId, 'Transferred Member');
		toast.success('Successfully transferred membership');

		// Redirect to the group page
		router.push(`/group/${params.groupId}`);
	}, [memberId, params.groupId, router]);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<h1 className='text-2xl font-semibold mb-4'>
					Transferring Membership...
				</h1>
				<p className='text-gray-500'>
					Please wait while we transfer your membership.
				</p>
			</div>
		</div>
	);
}
