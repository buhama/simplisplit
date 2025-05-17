import Header from '../../components/header';

export default function About() {
	return (
		<div className='relative flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]'>
			<Header />
			<div className='mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8'>
				<main className='flex-1'>
					<div className='flex w-full items-center justify-center'>
						<div className='w-full max-w-[1500px] min-h-screen flex flex-col'>
							<div className='border-x border-neutral-100 mx-2 sm:mx-4 md:mx-8 lg:mx-24 xl:mx-32'>
								<div className='relative min-h-[80vh] w-full pt-12 sm:pt-16'>
									<div className='left-4 font-mono sm:left-8 top-12 sm:top-16 flex flex-col items-start'>
										<h1 className='text-6xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-medium text-emerald-700 mb-8'>
											Our Story
										</h1>
										<div className='text-md sm:text-lg text-emerald-700 font-mono mb-8'>
											Built in Canada, for everyone
										</div>
									</div>
									<div className='bottom-8 left-4 sm:left-8 flex flex-col items-start text-left gap-8'>
										<div className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<div className='space-y-6'>
												<div>
													<h3 className='text-xl font-mono text-emerald-700 mb-2'>
														The Problem
													</h3>
													<p className='text-neutral-600 font-mono'>
														SimpliSplit was born to annoy a friend who kept
														sending links to splitting apps that sucked.
													</p>
												</div>
												<div>
													<h3 className='text-xl font-mono text-emerald-700 mb-2'>
														The Solution
													</h3>
													<p className='text-neutral-600 font-mono'>
														The result is a dead-simple way to split bills that
														isnt poopy. No complicated features, no hidden fees,
														just split and done.
													</p>
												</div>
											</div>
										</div>

										<div className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<div className='space-y-6'>
												<div>
													<h3 className='text-xl font-mono text-emerald-700 mb-2'>
														Open Source
													</h3>
													<p className='text-neutral-600 font-mono'>
														The code is open source because why not? Feel free
														to take a look, learn from it, or make it better.
													</p>
												</div>
												<div>
													<h3 className='text-xl font-mono text-emerald-700 mb-2'>
														Privacy First
													</h3>
													<p className='text-neutral-600 font-mono'>
														Your data is yours. No data collection, no tracking,
														no nonsense. Simple as that.
													</p>
												</div>
												<div>
													<h3 className='text-xl font-mono text-emerald-700 mb-2'>
														No BS
													</h3>
													<p className='text-neutral-600 font-mono'>
														No fancy marketing, no &ldquo;revolutionary
														features&rdquo; - just a straightforward tool that
														does exactly what it says it will do.
													</p>
												</div>
											</div>
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
