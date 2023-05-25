import BaseLayout from '../../components/layout/BaseLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';

interface InputProps {
	label: string;
	name: string;
	value: string;
}

function SettingInput(props: InputProps) {
	return (
		<div>
			<label className="block text-sm font-medium leading-6 text-gray-900">
				{props.label}
			</label>
			<div className="mt-2">
				<input
					name={props.name}
					defaultValue={props.value}
					type="text"
					required
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				/>
			</div>
		</div>
	)
}

export default function Settings() {
	const queryClient = useQueryClient();

	const settingsQuery = useQuery({
		queryKey: ['settings'],
		queryFn: async () => {
			const response = await axios.get(`/v1/settings`);
			return response.data;
		}
	})

	const updateSettingsMutation = useMutation(async (data: any) => {
		const response = await axios.put(`/v1/settings`, data);
		return response.data;
	}, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['settings']);
		}
	});

	const settings = settingsQuery.data;
	if (settingsQuery.isLoading) {
		return <BaseLayout>
			<LoadingIndicator />
		</BaseLayout>
	}

	const onSubmit = (e: any) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const data: any = Object.fromEntries(formData.entries());

		updateSettingsMutation.mutate(data);
	};

	return (
		<BaseLayout>
			<div className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
				<h1 className={"text-4xl font-semibold"}>Settings</h1>
				<h2 className={"mt-1"}>Configure the application easily on this page.</h2>

				<div className={"w-[30rem] mt-8"}>
					<form className="space-y-6" action="#" onSubmit={onSubmit}>

						<SettingInput label={"Name (company)"} name={"name"} value={settings.name} />
						<SettingInput label={"Street Address"} name={"streetAddress"} value={settings.streetAddress} />
						<SettingInput label={"Postal Code"} name={"postalCode"} value={settings.postalCode} />
						<SettingInput label={"City"} name={"city"} value={settings.city} />
						<SettingInput label={"Country (ISO)"} name={"country"} value={settings.country} />
						<SettingInput label={"Identification Number"} name={"identificationNumber"} value={settings.identificationNumber} />
						<SettingInput label={"Preferred Currency (ISO)"} name={"preferredCurrency"} value={settings.preferredCurrency} />
						<SettingInput label={"Additional invoice text"} name={"additionalText"} value={settings.additionalText} />

						<div>
							<button
								type="submit"
								className="flex w-[7rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</BaseLayout>
	)
}