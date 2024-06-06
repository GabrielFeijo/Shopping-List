'use server';

import { ShoppingItemType } from '@/app/page';

export const updateItem = async (item: ShoppingItemType) => {
	await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/shopping-items`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});
};
