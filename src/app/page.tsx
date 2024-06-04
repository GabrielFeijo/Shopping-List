import Form from '@/components/form/form';
import { Category, MeasureType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import React from 'react';

export type ItemType = {
	name: string;
	quantity: number;
	measureType: MeasureType;
	category: Category;
};

export default async function Home() {
	('use server');
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/items`, {
		cache: 'no-cache',
		next: {
			tags: ['item'],
		},
	});
	const data: ItemType[] = await res.json();

	const validateData = async () => {
		'use server';
		revalidatePath('/items');
	};
	return (
		<main>
			<div className='bg-[url("/background.png")] md:bg-contain h-44 fixed top-0 left-0 w-full md:bg-center' />
			<Form
				items={data}
				validateData={validateData}
			/>
		</main>
	);
}
