import BaseLayout from '../../components/layout/BaseLayout';

export default function Dashboard() {
	return (
		<BaseLayout>
			<h1 className={"text-4xl font-semibold"}>Welcome to the dashboard!</h1>
			<h2 className={"mt-2"}>Visit the Invoices tab to manage your invoices, or go to the Customers tab to manage your customers.</h2>
		</BaseLayout>
	)
}