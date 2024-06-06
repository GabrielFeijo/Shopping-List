import { formatType } from '@/utils/format-type';
import TagCategory from './tag-category';
import { Checkbox } from './ui/checkbox';
import { ShoppingItemType } from '@/app/page';

interface ItemChecklistProps {
	handleClick: (item: ShoppingItemType) => void;
}

const ItemChecklist = ({
	id,
	itemName,
	category,
	unitOfMeasure,
	quantity,
	completed,
	handleClick,
}: ShoppingItemType & ItemChecklistProps) => {
	return (
		<section
			className={`p-4 border border-secondary rounded-[.5rem] flex items-center justify-between ${
				completed ? 'opacity-70' : ''
			}`}
		>
			<div className='flex gap-4 items-center'>
				<form
					action={() =>
						handleClick({
							id,
							itemName,
							category,
							unitOfMeasure,
							quantity,
							completed: true,
						})
					}
				>
					<Checkbox
						type='submit'
						checked={completed}
						disabled={completed}
					/>
				</form>

				<div>
					<p
						className={`text-sm font-bold leading-5 capitalize ${
							completed ? 'line-through' : ''
						}`}
					>
						{itemName}
					</p>
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
