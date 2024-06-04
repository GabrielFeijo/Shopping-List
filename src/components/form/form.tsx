'use client';
import { useOptimistic } from 'react';
import DropdownCategory from './dropdown-category';
import DropdownUnit from './dropdown-unit';
import InputComponent from './input';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { ItemType } from '@/app/page';
import { Category, MeasureType } from '@prisma/client';
import ItemChecklist from '../item-checklist';

type ItemProps = {
	items: ItemType[];
	validateData: any;
};

const newItemSchema = z.object({
	name: z.string().min(2, { message: 'Nome é obrigatório' }),
	quantity: z
		.string()
		.min(1, { message: 'Quantidade é obrigatória' })
		.transform((str) => Number(str)),
	measureType: z.nativeEnum(MeasureType),
	category: z.nativeEnum(Category),
});

export default function Form({ items, validateData }: ItemProps) {
	const [optimisticItem, addOptimisticItem] = useOptimistic(
		items,
		(state, newItem: ItemType) => {
			return [...state, newItem];
		}
	);

	const registerItem = async (e: FormData) => {
		const result = newItemSchema.safeParse(Object.fromEntries(e));

		if (!result.success) {
			return result.error.flatten().fieldErrors;
		}

		addOptimisticItem(result.data);

		await fetch('http://localhost:3000/api/items', {
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
				{optimisticItem.map((item) => (
					<ItemChecklist
						key={item.name}
						{...item}
					></ItemChecklist>
				))}
			</div>
		</section>
	);
}
