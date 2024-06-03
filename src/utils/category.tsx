import { Apple, Beef, Carrot, Milk, Sandwich } from 'lucide-react';

export const categories = [
	{
		id: '1',
		name: 'Padaria',
		icon: <Sandwich className='size-5 text-[#BB9F3A]' />,
	},
	{
		id: '2',
		name: 'Legume',
		icon: <Carrot className='size-5 text-[#8CAD51]' />,
	},
	{ id: '3', name: 'Carne', icon: <Beef className='size-5 text-[#DB5BBF]' /> },
	{ id: '4', name: 'Fruta', icon: <Apple className='size-5 text-[#E07B67]' /> },
	{ id: '5', name: 'Bebida', icon: <Milk className='size-5 text-[#7B94CB]' /> },
];
