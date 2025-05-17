import { Button } from '@/components/ui/button';
import { BookIcon, DollarSignIcon, GroupIcon, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
	return (
		<nav className='sticky top-0 z-50 w-full transition-all duration-300 bg-tertiary border-b border-secondary bg-tertiary'>
			<div className='mx-auto w-full max-w-[1550px]'>
				<div className='flex h-14 items-center justify-between mx-4 sm:mx-12 md:mx-12 lg:mx-32 xl:mx-40'>
					<div className='flex items-center'>
						<Link href='/'>
							<Image src='/logo.png' alt='logo' width={100} height={100} />
						</Link>
					</div>
					<div className='text-tertiary flex items-center justify-center'>
						<button className='lg:hidden px-4 py-2'>
							<MenuIcon />
						</button>
						<div className='lg:flex hidden bg-primary absolute right-0 top-full flex-col rounded-b-xl p-4 shadow-md lg:relative lg:right-auto lg:top-auto lg:flex-row lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none'>
							<div className='flex flex-col items-start space-y-4 lg:flex-row lg:items-center gap-3 lg:space-y-0'>
								<Link
									href='/pricing'
									className='text-sm text-gray-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5'
								>
									<DollarSignIcon size={14} /> Pricing
								</Link>
								<div className='h-px w-full sm:h-4 sm:w-px border-r border-dashed border-gray-400 mx-1.5 opacity-50'></div>
								<Link
									href='/pricing'
									className='text-sm text-gray-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5'
								>
									<GroupIcon size={14} /> Careers
								</Link>
								<div className='h-px w-full sm:h-4 sm:w-px border-r border-dashed border-gray-400 mx-1.5 opacity-50'></div>
								<Link
									href='/pricing'
									className='text-sm text-gray-700 hover:text-emerald-900 transition-colors flex items-center gap-1.5'
								>
									<BookIcon size={14} /> Resources
								</Link>
							</div>
							<div className='mt-4 flex flex-col items-start space-y-4 sm:mt-0 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0 sm:ml-8'>
								<Link
									href='/login'
									className='text-sm text-gray-700 hover:text-secondary transition-colors flex items-center gap-1.5'
								>
									<Button>Create a group</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
