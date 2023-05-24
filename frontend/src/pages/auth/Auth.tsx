import { useState } from 'react';
import { useAuthState } from '../../stores/authStore';
import { ErrorResponse } from '../../api';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
	const authState = useAuthState();
	const navigate = useNavigate();
	const [error, setError] = useState<ErrorResponse>();

	const onSubmit = async (e: any) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const data: any = Object.fromEntries(formData.entries());

		const result = await authState.signIn(data.username, data.password);
		if (result.error) {
			setError(result.error);
			return;
		}

		navigate('/');
	}

	return (
		<>
			<form className="space-y-6" action="#" onSubmit={onSubmit}>
				{error && (
					<div>
						<Alert title={error.name} message={error.message} />
					</div>
				)}

				<div>
					<label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
						Username
					</label>
					<div className="mt-2">
						<input
							id="username"
							name="username"
							type="text"
							required
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
							Password
						</label>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						Sign in
					</button>
				</div>
			</form>
		</>
	)
}

function RegisterForm() {
	const authState = useAuthState();
	const navigate = useNavigate();
	const [error, setError] = useState<ErrorResponse>();

	const onSubmit = async (e: any) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const data: any = Object.fromEntries(formData.entries());

		const result = await authState.register(data.username, data.password);
		if (result.error) {
			setError(result.error);
			return;
		}

		navigate('/');
	}

	return (
		<>
			<form className="space-y-6" action="#" onSubmit={onSubmit}>
				{error && (
					<div>
						<Alert title={error.name} message={error.message} />
					</div>
				)}

				<div>
					<label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
						Username
					</label>
					<div className="mt-2">
						<input
							id="username"
							name="username"
							type="text"
							required
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
							Password
						</label>
					</div>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							required
							className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						Register
					</button>
				</div>
			</form>
		</>
	)
}

export default function Auth() {
	const [isRegister, setIsRegister] = useState<boolean>(false);

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h1 className="text-gray-400 text-center">Invoice Manager</h1>
				<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					{isRegister ? 'Create an account' : 'Sign in to your account'}
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{isRegister ? (
					<>
						<RegisterForm />

						<p className="mt-10 text-center text-sm text-gray-400">
							Already have an account?{' '}
							<a onClick={() => setIsRegister(false)} href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
								Sign In
							</a>
						</p>
					</>
				) : (
					<>
						<SignInForm />

						<p className="mt-10 text-center text-sm text-gray-400">
							Don't have an account?{' '}
							<a onClick={() => setIsRegister(true)} href="#" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
								Register Now
							</a>
						</p>
					</>
				)}
			</div>
		</div>
	)
}