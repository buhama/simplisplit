import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
	metadataBase: new URL('https://simplisplit.com'),
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://simplisplit.com',
		title: 'SimpliSplit - Split Bills with Friends',
		description:
			'Track shared expenses effortlessly, collect debts drama-free, and never have awkward money talks again.',
		siteName: 'SimpliSplit',
		images: [
			{
				url: '/opengraph-image',
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
		images: ['/twitter-image'],
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
