import React from 'react';

export default function GroupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className='mx-auto w-full max-w-7xl px-6 pb-6'>{children}</div>;
}
