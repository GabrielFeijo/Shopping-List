'use server';

import { ShoppingItemType } from '@/app/page';

export const saveItem = async (item: ShoppingItemType) => {
	return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/shopping-items`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(item),
	});
};
