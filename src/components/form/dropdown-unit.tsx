import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const DropdownUnit = () => {
	return (
		<div>
			<label
				htmlFor='quantity'
				className='text-xs tracking-wide '
			>
				Quantidade
			</label>
			<div className='flex w-40 mt-2'>
				<Input
					className='focus-visible:ring-transparent rounded-none rounded-l-lg'
					name='quantity'
					type='number'
					placeholder='Qtde.'
				/>
				<Select name='unit'>
					<SelectTrigger className='w-20 rounded-none rounded-r-lg text-xs'>
						<SelectValue placeholder='Unit' />
					</SelectTrigger>
					<SelectContent className='!w-20'>
						<SelectItem value='und'>UN.</SelectItem>
						<SelectItem value='l'>L</SelectItem>
						<SelectItem value='kg'>Kg</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default DropdownUnit;
