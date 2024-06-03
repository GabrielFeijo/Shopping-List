'use client';
import { useOptimistic } from 'react';
import { Input } from '../ui/input';
import DropdownCategory from './dropdown-category';
import DropdownUnit from './dropdown-unit';
import InputComponent from './input';
import { Plus } from 'lucide-react';

type JobType = {
	sand_id?: number;
	name: string;
	job: string;
};
type JobProps = {
	jobs: JobType[];
	validateData: any;
};

export default function Form({ jobs, validateData }: JobProps) {
	const [optimisticJob, addOptimisticJob] = useOptimistic(
		jobs,
		(state, newJob: JobType) => {
			return [...state, newJob];
		}
	);

	const addJob = async (e: FormData) => {
		const name = e.get('name')?.toString();
		const job = e.get('job')?.toString();
		if (!name || !job) return;

		const formInput = {
			name,
			job,
		};

		addOptimisticJob(formInput);

		await fetch('https://api.sandapi.com/user_wFnZRo/jobs', {
			method: 'POST',
			body: JSON.stringify(formInput),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		await validateData();
	};

	return (
		<main className='space-y-6 w-3/4 mx-auto'>
			<h1 className='font-bold text-2xl'>Lista de Compras</h1>
			<form
				action={addJob}
				className='flex flex-1 gap-3 items-center'
			>
				<InputComponent />
				<DropdownUnit />
				<DropdownCategory />
				<button
					type='submit'
					className='bg-[#7450AC] rounded-full p-2'
				>
					<Plus />
				</button>
			</form>
		</main>
	);
}
