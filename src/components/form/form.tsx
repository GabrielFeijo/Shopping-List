'use client';
import { useOptimistic } from 'react';
import DropdownCategory from './dropdown-category';
import DropdownUnit from './dropdown-unit';
import InputComponent from './input';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import ItemChecklist from '../item-checklist';
import { ShoppingItemType } from '@/app/page';
import { ItemCategory, UnitOfMeasure } from '@prisma/client';

type ShoppingListProps = {
	shoppingItems: ShoppingItemType[];
	validateData: any;
};

const newItemSchema = z.object({
	itemName: z.string().min(2, { message: 'Nome é obrigatório' }),
	quantity: z
		.string()
		.min(1, { message: 'Quantidade é obrigatória' })
		.transform((str) => Number(str)),
	unitOfMeasure: z.nativeEnum(UnitOfMeasure),
	category: z.nativeEnum(ItemCategory),
});

export default function Form({
	shoppingItems,
	validateData,
}: ShoppingListProps) {
	const [optimisticItem, addOptimisticItem] = useOptimistic(
		shoppingItems,
		(state, newShoppingItem: ShoppingItemType) => {
			return [...state, newShoppingItem];
		}
	);

	const registerItem = async (e: FormData) => {
		const result = newItemSchema.safeParse(Object.fromEntries(e));

		if (!result.success) {
			return result.error.flatten().fieldErrors;
		}

		addOptimisticItem({ ...result.data, completed: false });

		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/shopping-items`, {
			method: 'POST',
			body: JSON.stringify(result.data),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		await validateData();
	};

	return (
		<section className='space-y-6 w-3/4 mx-auto mt-20 relative'>
			<h1 className='font-bold text-2xl'>Lista de Compras</h1>
			<form
				action={registerItem}
				className='flex flex-1 gap-3 items-center sm:flex-nowrap flex-wrap'
			>
				<InputComponent />
				<DropdownUnit />
				<DropdownCategory />

				<div className='h-4'>
					<button
						type='submit'
						className='bg-[#7450AC] rounded-full p-2'
					>
						<Plus />
					</button>
				</div>
			</form>
			<div className='h-[calc(100vh-15rem)] space-y-6 overflow-auto pr-1.5'>
				{optimisticItem.map((shoppingItem) => (
					<ItemChecklist
						key={shoppingItem.itemName}
						{...shoppingItem}
					></ItemChecklist>
				))}
			</div>
		</section>
	);
}
