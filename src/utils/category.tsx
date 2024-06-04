import { Apple, Beef, Carrot, Milk, Sandwich } from 'lucide-react';

export const categories = [
	{
		id: '1',
		name: 'Padaria',
		color: '#BB9F3A',
		icon: <Sandwich className='size-5 text-[#BB9F3A]' />,
	},
	{
		id: '2',
		name: 'Legume',
		color: '#8CAD51',
		icon: <Carrot className='size-5 text-[#8CAD51]' />,
	},
	{
		id: '3',
		name: 'Carne',
		color: '#DB5BBF',
		icon: <Beef className='size-5 text-[#DB5BBF]' />,
	},
	{
		id: '4',
		name: 'Fruta',
		color: '#E07B67',
		icon: <Apple className='size-5 text-[#E07B67]' />,
	},
	{
		id: '5',
		name: 'Bebida',
		color: '#7B94CB',
		icon: <Milk className='size-5 text-[#7B94CB]' />,
	},
];
