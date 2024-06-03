import { Input } from '../ui/input';

const InputComponent = () => {
	return (
		<div className='w-full'>
			<label
				htmlFor='name'
				className='text-xs tracking-wide '
			>
				Item
			</label>
			<div className='mt-2'>
				<Input
					className='focus-visible:ring-transparent'
					placeholder='Nome do item'
					name='name'
				/>
			</div>
		</div>
	);
};

export default InputComponent;
