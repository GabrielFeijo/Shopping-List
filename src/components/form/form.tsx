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
import { saveItem } from './actions/register-item';
import { updateItem } from './actions/update-item';

type ShoppingListProps = {
	shoppingItems: ShoppingItemType[];
	validateData: () => Promise<void>;
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
		(
			state,
			{
				action,
				newShoppingItem,
			}: { action: string; newShoppingItem: ShoppingItemType }
		) => {
			switch (action) {
				case 'delete':
					return state.filter(({ id }) => id !== newShoppingItem.id);
				case 'update':
					return state.map((t) =>
						t.id === newShoppingItem.id ? newShoppingItem : t
					);
				default:
					return [...state, newShoppingItem];
			}
		}
	);

	const mongoObjectId = () => {
		const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
		return (
			timestamp +
			'xxxxxxxxxxxxxxxx'
				.replace(/[x]/g, function () {
					return ((Math.random() * 16) | 0).toString(16);
				})
				.toLowerCase()
		);
	};

	const registerItem = async (e: FormData) => {
		const result = newItemSchema.safeParse(Object.fromEntries(e));

		if (!result.success) {
			return result.error.flatten().fieldErrors;
		}

		const id = mongoObjectId();

		const newShoppingItem = {
			id,
			...result.data,
			completed: false,
		};

		addOptimisticItem({
			newShoppingItem,
			action: 'create',
		});

		await saveItem(newShoppingItem);

		await validateData();
	};

	const handleClick = async (item: ShoppingItemType) => {
		addOptimisticItem({
			newShoppingItem: item,
			action: 'update',
		});

		await updateItem(item);

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
						key={shoppingItem.id}
						handleClick={handleClick}
						{...shoppingItem}
					></ItemChecklist>
				))}
			</div>
		</section>
	);
}
