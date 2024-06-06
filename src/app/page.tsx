import Form from '@/components/form/form';
import { ItemCategory, UnitOfMeasure } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import React from 'react';

export type ShoppingItemType = {
	itemName: string;
	quantity: number;
	unitOfMeasure: UnitOfMeasure;
	category: ItemCategory;
	completed: boolean;
};

export default async function Home() {
	('use server');
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/shopping-items`,
		{
			cache: 'no-store',
			next: {
				tags: ['shopping-items'],
			},
		}
	);

	const data: ShoppingItemType[] = await res.json();

	const validateData = async () => {
		'use server';
		revalidatePath('/shopping-items');
	};
	return (
		<main>
			<div className='bg-[url("/background.png")] md:bg-contain h-44 fixed top-0 left-0 w-full md:bg-center' />
			<Form
				shoppingItems={data}
				validateData={validateData}
			/>
		</main>
	);
}
