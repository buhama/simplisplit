import Header from '../components/header';
import Typewriter from '@/fancy/components/text/typewriter';
import CreateGroup from '../components/create-group/create-group';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'SimpliSplit - Split Bills with Friends',
	description:
		'Track shared expenses effortlessly, collect debts drama-free, and never have awkward money talks again. The simplest way to split bills with friends.',
	keywords: [
		'bill splitting',
		'expense sharing',
		'group expenses',
		'debt tracking',
		'payment splitting',
		'shared expenses',
	],
	authors: [{ name: 'SimpliSplit Team' }],
	creator: 'SimpliSplit',
	publisher: 'SimpliSplit',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://simplisplit.ca'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://simplisplit.ca',
		title: 'SimpliSplit - Split Bills with Friends',
		description:
			'Track shared expenses effortlessly, collect debts drama-free, and never have awkward money talks again.',
		siteName: 'SimpliSplit',
		images: [
			{
				url: '/preview-image.png',
				width: 1200,
				height: 630,
				alt: 'SimpliSplit - Split your bills with friends',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SimpliSplit - Split Bills with Friends',
		description:
			'Track shared expenses effortlessly, collect debts drama-free, and never have awkward money talks again.',
		creator: '@simplisplit',
		images: ['/preview-image.png'],
	},
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/favicon.ico',
	},
};

export default function Home() {
	return (
		<div className='relative flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)]'>
			<Header />
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
															Split your bills <br /> with friends
														</h1>
													</div>
												</div>
												<div className='absolute right-0 bottom-0 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] xl:h-[750px] xl:w-[750px] overflow-visible'></div>
												<div className='absolute bottom-8 left-4 sm:left-8 flex flex-col items-start text-left gap-2'>
													<div className='text-md sm:text-lg text-emerald-700 font-mono'>
														<Typewriter
															text={[
																'Track shared expenses effortlessly',
																'Track shared expenses in real-time',
																'Track shared expenses automatically',
															]}
															speed={70}
															className='text-emerald-700'
															waitTime={2500}
															deleteSpeed={40}
															cursorChar={'_'}
														/>
													</div>
													<div className='text-md sm:text-lg text-emerald-700 font-mono'>
														<Typewriter
															text={[
																'Drama free debt collection always',
																'Drama free debt settlement instantly',
																'Drama free payment reminders',
															]}
															speed={70}
															className='text-emerald-700'
															waitTime={2500}
															deleteSpeed={40}
															cursorChar={'_'}
														/>
													</div>
													<div className='text-md sm:text-lg text-emerald-700 font-mono'>
														<Typewriter
															text={[
																'No more awkward money talks',
																'No more chasing payments',
																'No more splitting headaches',
															]}
															speed={70}
															className='text-emerald-700'
															waitTime={2500}
															deleteSpeed={40}
															cursorChar={'_'}
														/>
													</div>
													<CreateGroup>
														<Button className='mt-4 font-mono'>
															Start for free <ArrowRightIcon size={16} />
														</Button>
													</CreateGroup>
												</div>
											</div>
										</div>
									</div>
								</main>
							</div>
						</div>
					</div>
				</main>
				<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
			</div>
		</div>
	);
}
