import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const alt = 'SimpliSplit - Split your bills with friends';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	// Font loading
	const interSemiBold = await readFile(
		join(
			process.cwd(),
			'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff'
		)
	);

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
						}}
					>
						SimpliSplit
					</h1>
					<p
						style={{
							fontSize: '48px',
							color: '#047857', // emerald-700
							margin: 0,
							fontFamily: 'monospace',
						}}
					>
						Split bills, share expenses
					</p>
					<p
						style={{
							fontSize: '32px',
							color: '#047857', // emerald-700
							margin: 0,
							fontFamily: 'monospace',
						}}
					>
						No more awkward money talks
					</p>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{
					name: 'Inter',
					data: interSemiBold,
					style: 'normal',
					weight: 600,
				},
			],
		}
	);
}
