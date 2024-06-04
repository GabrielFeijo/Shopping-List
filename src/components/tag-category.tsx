import { categories } from '@/utils/category';

const TagCategory = ({ categoryName }: { categoryName: string }) => {
	const category = categories.find(
		(category) => category.name.toUpperCase() === categoryName
	);

	if (!category) return null;

	const { name, icon, color } = category;

	return (
		<div
			className={`py-2 px-4 rounded-full flex justify-center items-center gap-2 text-[${color}] `}
			style={{ backgroundColor: `${color}10` }}
		>
			{icon}
			<span className='text-xs font-semibold'>{name}</span>
		</div>
	);
};

export default TagCategory;
