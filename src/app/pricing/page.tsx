import Header from '../../components/header';

export default function Pricing() {
	return (
		<div className='relative flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]'>
			<Header />
			<div className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
				<main className='flex-1'>
					<div className='flex w-full items-center justify-center'>
						<div className='w-full max-w-[1500px] min-h-screen flex flex-col'>
							<div className='border-x border-neutral-100 mx-2 sm:mx-4 md:mx-8 lg:mx-24 xl:mx-32'>
								<div className='relative min-h-[80vh] w-full pt-12 sm:pt-16'>
									<div className='absolute left-4 font-mono sm:left-8 top-12 sm:top-16 flex flex-col items-start'>
										<h1 className='text-6xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-medium text-emerald-700 mb-8'>
											Free Forever
										</h1>
										<div className='text-md sm:text-lg text-emerald-700 font-mono mb-8'>
											No hidden fees. No premium features. Just pure bill
											splitting.
										</div>
									</div>
									<div className='absolute right-0 bottom-0 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] xl:h-[750px] xl:w-[750px] overflow-visible'></div>
									<div className='absolute bottom-8 left-4 sm:left-8 flex flex-col items-start text-left gap-4'>
										<div className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<ul className='space-y-6'>
												<li className='flex items-start gap-4'>
													<span className='text-emerald-600 text-xl font-mono'>
														→
													</span>
													<div>
														<h3 className='text-xl font-mono text-emerald-700 mb-2'>
															Unlimited Groups
														</h3>
														<p className='text-neutral-600 font-mono'>
															Create as many groups as you need for any occasion
														</p>
													</div>
												</li>
												{/* <li className='flex items-start gap-4'>
													<span className='text-emerald-600 text-xl font-mono'>
														→
													</span>
													<div>
														<h3 className='text-xl font-mono text-emerald-700 mb-2'>
															Real-time Tracking
														</h3>
														<p className='text-neutral-600 font-mono'>
															Track expenses and balances instantly
														</p>
													</div>
												</li> */}
												{/* <li className='flex items-start gap-4'>
													<span className='text-emerald-600 text-xl font-mono'>
														→
													</span>
													<div>
														<h3 className='text-xl font-mono text-emerald-700 mb-2'>
															Smart Reminders
														</h3>
														<p className='text-neutral-600 font-mono'>
															Automated payment reminders to keep everyone in
															sync
														</p>
													</div>
												</li> */}
												<li className='flex items-start gap-4'>
													<span className='text-emerald-600 text-xl font-mono'>
														→
													</span>
													<div>
														<h3 className='text-xl font-mono text-emerald-700 mb-2'>
															Open Source
														</h3>
														<p className='text-neutral-600 font-mono'>
															Born from frustration with existing solutions,
															built with simplicity in mind
														</p>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
