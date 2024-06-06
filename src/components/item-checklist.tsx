import { formatType } from '@/utils/format-type';
import TagCategory from './tag-category';
import { Checkbox } from './ui/checkbox';
import { ShoppingItemType } from '@/app/page';

const ItemChecklist = ({
	itemName,
	category,
	unitOfMeasure,
	quantity,
}: ShoppingItemType) => {
	return (
		<section className='p-4 border border-secondary rounded-[.5rem] flex items-center justify-between'>
			<div className='flex gap-4 items-center'>
				<Checkbox id='terms' />

				<div>
					<p className='text-sm font-bold leading-5 capitalize'>{itemName}</p>
					<span className='text-xs'>
						{quantity} {formatType(unitOfMeasure)}
					</span>
				</div>
			</div>

			<TagCategory categoryName={category} />
		</section>
	);
};

export default ItemChecklist;
