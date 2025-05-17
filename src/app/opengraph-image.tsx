import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'SimpliSplit - Split your bills with friends';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '40px',
					position: 'relative',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
						gap: '20px',
					}}
				>
					<h1
						style={{
							fontSize: '72px',
							fontWeight: 600,
							color: '#047857', // emerald-700
							margin: 0,
							lineHeight: 1.2,
							fontFamily:
								'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
						}}
					>
						Split your bills with friends
					</h1>
					<p
						style={{
							fontSize: '32px',
							color: '#047857', // emerald-700
							margin: 0,
							fontFamily:
								'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
						}}
					>
						Track shared expenses effortlessly
					</p>
					<p
						style={{
							fontSize: '32px',
							color: '#047857', // emerald-700
							margin: 0,
							fontFamily:
								'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
						}}
					>
						Drama free debt collection always
					</p>
				</div>
			</div>
		),
		{
			...size,
		}
	);
}
