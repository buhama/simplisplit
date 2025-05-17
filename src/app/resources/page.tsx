import Header from '../../components/header';

export default function Resources() {
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
											Resources
										</h1>
										<div className='text-md sm:text-lg text-emerald-700 font-mono mb-8'>
											Learn more about managing shared expenses
										</div>
									</div>
									<div className='bottom-8 left-4 sm:left-8 flex flex-col items-start text-left gap-6'>
										<article className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<h2 className='text-2xl font-mono text-emerald-700 mb-4'>
												The Psychology of Splitting Bills
											</h2>
											<p className='text-neutral-600 font-mono mb-4'>
												Splitting bills isn&apos;t just about the money -
												it&apos;s about maintaining healthy relationships. Learn
												how proper bill splitting can strengthen friendships and
												reduce financial stress.
											</p>
											<div className='flex items-center text-sm text-neutral-500 font-mono'>
												<span>5 min read</span>
												<span className='mx-2'>→</span>
												<span>Financial Psychology</span>
											</div>
										</article>

										<article className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<h2 className='text-2xl font-mono text-emerald-700 mb-4'>
												Group Travel: A Complete Guide
											</h2>
											<p className='text-neutral-600 font-mono mb-4'>
												Planning a group trip? Discover the best practices for
												managing shared expenses, from accommodation to
												activities, and learn how to avoid common pitfalls.
											</p>
											<div className='flex items-center text-sm text-neutral-500 font-mono'>
												<span>8 min read</span>
												<span className='mx-2'>→</span>
												<span>Travel Finance</span>
											</div>
										</article>

										<article className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<h2 className='text-2xl font-mono text-emerald-700 mb-4'>
												Digital Payments: The Future
											</h2>
											<p className='text-neutral-600 font-mono mb-4'>
												Explore how digital payment solutions are
												revolutionizing the way we handle shared expenses,
												making it easier than ever to split bills and track
												payments.
											</p>
											<div className='flex items-center text-sm text-neutral-500 font-mono'>
												<span>6 min read</span>
												<span className='mx-2'>→</span>
												<span>Fintech</span>
											</div>
										</article>

										<article className='bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-100 max-w-2xl'>
											<h2 className='text-2xl font-mono text-emerald-700 mb-4'>
												Roommate Finances
											</h2>
											<p className='text-neutral-600 font-mono mb-4'>
												Living with roommates? Learn how to create a fair and
												transparent system for managing shared household
												expenses, from rent to utilities and groceries.
											</p>
											<div className='flex items-center text-sm text-neutral-500 font-mono'>
												<span>7 min read</span>
												<span className='mx-2'>→</span>
												<span>Living Together</span>
											</div>
										</article>
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
