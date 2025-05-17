import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

interface TransferMemberProps {
	groupId: string;
	memberId: string;
}

export function TransferMember({ groupId, memberId }: TransferMemberProps) {
	const [isOpen, setIsOpen] = useState(false);
	const transferLink = `${window.location.origin}/groups/${groupId}/transfer?memberId=${memberId}`;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(transferLink);
			toast.success('Transfer link copied to clipboard');
		} catch (err) {
			toast.error('Failed to copy link');
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm'>
					Transfer Yourself
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Transfer Your Membership</DialogTitle>
				</DialogHeader>
				<div className='space-y-4'>
					<p className='text-sm text-gray-500'>
						Share this link to transfer your membership to another browser or
						device. The link will automatically add you as a member when opened.
					</p>
					<div className='flex gap-2'>
						<Input value={transferLink} readOnly />
						<Button onClick={copyToClipboard} size='icon' variant='outline'>
							<CopyIcon className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
