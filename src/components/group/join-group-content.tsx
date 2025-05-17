import React, { useState } from 'react';
import { JoinGroupDialog } from './join-group-dialog';
import { GroupMember } from '@/models/Group';
import { Group } from '@/models/Group';

interface JoinGroupContentProps {
	group: Group;
	members: GroupMember[];
}

const JoinGroupContent = ({ group, members }: JoinGroupContentProps) => {
	const [showJoinDialog, setShowJoinDialog] = useState(false);
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
};

export default JoinGroupContent;
