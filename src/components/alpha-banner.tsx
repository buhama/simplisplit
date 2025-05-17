import { AlertTriangle } from 'lucide-react';

export function AlphaBanner() {
	return (
		<div className='w-full bg-emerald-700 mb-1 text-emerald-200 font-mono py-2 px-4 text-center text-sm font-medium'>
			<div className='flex items-center justify-center gap-2'>
				<AlertTriangle className='h-4 w-4' />
				<span>
					This app is currently in alpha. Please proceed with caution.
				</span>
			</div>
		</div>
	);
}
