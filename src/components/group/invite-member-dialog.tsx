'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UsersIcon, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface InviteMemberDialogProps {
	groupId: string;
}

export function InviteMemberDialog({ groupId }: InviteMemberDialogProps) {
	const [copied, setCopied] = useState(false);
	const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/group/${groupId}`;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareLink);
			setCopied(true);
			toast.success('Link copied to clipboard');
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error('Failed to copy link');
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm' className=''>
					<UsersIcon className='mr-1 h-4 w-4' />
					Invite
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite members</DialogTitle>
					<DialogDescription>
						Share this link with people you want to invite to your group.
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-2'>
						<Input readOnly value={shareLink} className='flex-1' />
						<Button
							variant='outline'
							size='icon'
							onClick={copyToClipboard}
							className='shrink-0'
						>
							{copied ? (
								<CheckCircle2 className='h-4 w-4 text-emerald-700' />
							) : (
								<Copy className='h-4 w-4' />
							)}
						</Button>
					</div>
					<p className='text-sm text-muted-foreground'>
						Anyone with this link (and the passcode) can join your group. The
						link will never expire.
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
