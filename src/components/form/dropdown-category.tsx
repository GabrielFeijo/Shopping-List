import { categories } from '@/utils/category';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const DropdownCategory = () => {
	return (
		<div className='sm:w-full'>
			<label
				htmlFor='category'
				className='text-xs tracking-wide '
			>
				Categoria
			</label>
			<div className='mt-2'>
				<Select name='category'>
					<SelectTrigger className='text-xs '>
						<SelectValue placeholder='Selecione a Categoria' />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem
								key={category.id}
								value={category.name.toUpperCase()}
							>
								<div className='flex items-center gap-2'>
									{category.icon} {category.name}
								</div>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default DropdownCategory;
