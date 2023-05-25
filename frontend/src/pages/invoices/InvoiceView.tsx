import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CalendarDaysIcon, CreditCardIcon, EllipsisVerticalIcon, UserCircleIcon, } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import BaseLayout from '../../components/layout/BaseLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import { formatMoney, getCountryName } from '../../api';
import _ from 'lodash';
import moment from 'moment';

export default function InvoiceView() {
	const { id } = useParams();
	const queryClient = useQueryClient();

	const invoiceQuery = useQuery({
		queryKey: ['invoices', id],
		queryFn: async () => {
			const response = await axios.get(`/v1/invoices/${id}`);
			return response.data;
		}
	})

	const settingsQuery = useQuery({
		queryKey: ['settings'],
		queryFn: async () => {
			const response = await axios.get(`/v1/settings`);
			return response.data;
		}
	})

	const addPaymentMutation = useMutation(async (data: any) => {
		const response = await axios.post(`/v1/invoices/${id}/payments`, data);
		return response.data;
	}, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['invoices']);
		}
	});

	function addPayment(e: any) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const data: any = Object.fromEntries(formData.entries());

		addPaymentMutation.mutate({
			paymentMethod: 'n/a',
			amount: Number(data.payment),
			externalPaymentId: 'unknown',
			paidAt: new Date()
		});

		form.payment.value = '';
	}

	const invoice = invoiceQuery.data;
	if (invoice) invoice.total = _.sumBy(invoice?.invoiceLines, (item: any) => Number(item.amount) * Number(item.quantity));

	const settings = settingsQuery.data;

	return (
		<BaseLayout>
			{(invoiceQuery.isLoading || settingsQuery.isLoading) ? <LoadingIndicator /> : (
			<main>
				<header className="relative isolate">
					<div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
						<div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
							<div
								className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
								style={{
									clipPath: 'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
								}}
							/>
						</div>
						<div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
					</div>

					<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
						<div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
							<div className="flex items-center gap-x-6">
								<h1>
									<div className="text-sm leading-6 text-gray-500">
										Invoice <span className="text-gray-700">#{invoice.number}</span>
									</div>
									<div className="mt-1 text-base font-semibold leading-6 text-gray-900">{invoice.customer.name}</div>
								</h1>
							</div>
							<div className="flex items-center gap-x-4 sm:gap-x-6">
								<a
									href="#"
									className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Edit Invoice
								</a>

								<Menu as="div" className="relative sm:hidden">
									<Menu.Button className="-m-3 block p-3">
										<EllipsisVerticalIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
									</Menu.Button>

									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<button
														type="button"
														className={clsx(
															active ? 'bg-gray-50' : '',
															'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
														)}
													>
														Copy URL
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={clsx(
															active ? 'bg-gray-50' : '',
															'block px-3 py-1 text-sm leading-6 text-gray-900'
														)}
													>
														Edit
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</header>

				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
					<div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{/* Invoice summary */}
						<div className="lg:col-start-3 lg:row-end-1">
							<div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 pb-6">
								<dl className="flex flex-wrap">
									<div className="flex-auto pl-6 pt-6">
										<dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
										<dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{formatMoney(invoice.total, invoice.currency)}</dd>
									</div>
									<div className="flex-none self-end px-6 pt-4">
										<dd className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20">
											{invoice.paid ? 'Paid' : 'Unpaid'}
										</dd>
									</div>
									<div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
										<dt className="flex-none">
											<UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
										</dt>
										<dd className="text-sm font-medium leading-6 text-gray-900">{invoice.customer.name}</dd>
									</div>
									<div className="mt-4 flex w-full flex-none gap-x-4 px-6">
										<dt className="flex-none">
											<CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
										</dt>
										<dd className="text-sm leading-6 text-gray-500">
											{invoice.dueAt ? moment(invoice.dueAt).format('lll') : 'N/A'}
										</dd>
									</div>
								</dl>
							</div>
						</div>

						{/* Invoice */}
						<div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
							<h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
							<dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
								<div className="sm:pr-4">
									<dt className="inline text-gray-500">Issued on</dt>{' '}
									<dd className="inline text-gray-700">
										{moment(invoice.createdAt).format('ll')}
									</dd>
								</div>
								<div className="mt-2 sm:mt-0 sm:pl-4">
									{invoice.dueAt && (
										<>
											<dt className="inline text-gray-500">Due on</dt>{' '}
											<dd className="inline text-gray-700">
												{moment(invoice.dueAt).format('lll')}
											</dd>
										</>
									)}
								</div>
								<div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
									<dt className="font-semibold text-gray-900">From</dt>
									<dd className="mt-2 text-gray-500">
										<span className="font-medium text-gray-900">{settings?.name}</span>
										<br />
										{settings?.streetAddress}
										<br />
										{settings?.city}, {settings?.postalCode}, {getCountryName(settings?.country)}
									</dd>
								</div>
								<div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
									<dt className="font-semibold text-gray-900">To</dt>
									<dd className="mt-2 text-gray-500">
										<span className="font-medium text-gray-900">{invoice.customer.name}</span>
										<br />
										{invoice.customer.streetAddress}
										<br />
										{invoice.customer.city}, {invoice.customer.postalCode}, {getCountryName(invoice.customer.country)}
									</dd>
								</div>
							</dl>
							<table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
								<colgroup>
									<col className="w-full" />
									<col />
									<col />
									<col />
								</colgroup>
								<thead className="border-b border-gray-200 text-gray-900">
								<tr>
									<th scope="col" className="px-0 py-3 font-semibold">
										Item
									</th>
									<th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
										Qty
									</th>
									<th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
										Price
									</th>
									<th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
										Total
									</th>
								</tr>
								</thead>
								<tbody>
								{invoice.invoiceLines?.map((item: any) => (
									<tr key={item.id} className="border-b border-gray-100">
										<td className="max-w-0 px-0 py-5 align-top">
											<div className="truncate font-medium text-gray-900">{item.lineText}</div>
											<div className="truncate text-gray-500 text-[0.6rem]">{item.id}</div>
										</td>
										<td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
											{item.quantity}
										</td>
										<td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
											{item.amount}
										</td>
										<td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{formatMoney(Number(item.amount) * Number(item.quantity), invoice.currency)}</td>
									</tr>
								))}
								</tbody>
								<tfoot>
								{/*<tr>
									<th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
										Subtotal
									</th>
									<th
										scope="row"
										colSpan={3}
										className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
									>
										Subtotal
									</th>
									<td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
								</tr>
								<tr>
									<th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
										Tax
									</th>
									<th
										scope="row"
										colSpan={3}
										className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
									>
										Tax
									</th>
									<td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
								</tr>*/}
								<tr>
									<th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
										Total
									</th>
									<th
										scope="row"
										colSpan={3}
										className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
									>
										Total
									</th>
									<td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
										{formatMoney(invoice.total, invoice.currency)}
									</td>
								</tr>
								</tfoot>
							</table>
						</div>

						<div className="lg:col-start-3">
							<h2 className="text-sm font-semibold leading-6 text-gray-900">Payments</h2>
							<ul role="list" className="mt-6 space-y-6">
								{invoice.invoicePayments?.map((paymentItem: any, paymentItemIdx: number) => (
									<li key={paymentItem.id} className="relative flex gap-x-4">
										<div
											className={clsx(
												paymentItemIdx === invoice.invoicePayments.length - 1 ? 'h-6' : '-bottom-6',
												'absolute left-0 top-0 flex w-6 justify-center'
											)}
										>
											<div className="w-px bg-gray-200" />
										</div>

										<div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
											<CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
										</div>
										<p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
											<span className="font-medium text-gray-900">{invoice.customer.name}</span>{' '}
											made a payment of {formatMoney(Number(paymentItem.amount), invoice.currency)}.
										</p>
										<time
											dateTime={paymentItem.createdAt}
											className="flex-none py-0.5 text-xs leading-5 text-gray-500"
										>
											{moment(paymentItem.createdAt).format('ll')}
										</time>
									</li>
								))}
							</ul>

							<div className="mt-6 flex gap-x-3">
								<form action="#" onSubmit={addPayment} className="relative flex-auto">
									<div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
										<input
											name="payment"
											id="payment"
											type="number"
											className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Add a payment..."
											defaultValue={''}
										/>
									</div>

									<div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
										<button
											type="submit"
											className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										>
											Add Payment ({invoice.currency.toUpperCase()})
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</main>
			)}
		</BaseLayout>
	)
}