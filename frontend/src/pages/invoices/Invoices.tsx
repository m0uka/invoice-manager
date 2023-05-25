import BaseLayout from '../../components/layout/BaseLayout';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { ArrowPathIcon, ArrowUpCircleIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import moment from 'moment';
import _ from 'lodash';
import { formatMoney, getCountryName } from '../../api';

const statuses = {
	Paid: 'text-green-700 bg-green-50 ring-green-600/20',
	Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
	Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
}

export default function Invoices() {
	const invoices = useQuery({
		queryKey: ['invoices'],
		queryFn: async () => {
			const response = await axios.get('/v1/invoices');
			return response.data;
		}
	})

	// God bless stackoverflow
	// https://stackoverflow.com/a/43715469/9040567
	const result = _.groupBy(invoices.data, (item: any) => moment(item.createdAt).format('YYYY-MM-DD'));
	const days = Object.keys(result).map(x => ({
		date: moment(x).fromNow(),
		dateTime: x,
		transactions: result[x].map(x => ({ ...x, total: _.sumBy(x.invoiceLines, (item: any) => Number(item.amount) * Number(item.quantity)) }))
	}));

	return (
		<BaseLayout>
			{invoices.isLoading ? <LoadingIndicator /> : (
				<div>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
							Invoices
						</h2>
					</div>
					<div className="mt-6 overflow-hidden border-t border-gray-100">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
								<table className="w-full text-left">
									<tbody>
									{days.map((day) => (
										<Fragment key={day.dateTime}>
											<tr className="text-sm leading-6 text-gray-900">
												<th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
													<time dateTime={day.dateTime}>{day.date}</time>
													<div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
													<div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
												</th>
											</tr>
											{day.transactions.map((invoice) => (
												<tr key={invoice.id}>
													<td className="relative py-5 pr-6">
														<div className="flex gap-x-6">
															{invoice.paid ? (
																<ArrowUpCircleIcon className={"hidden h-6 w-5 flex-none text-gray-400 sm:block"} />
															) : (
																<ArrowPathIcon className={"hidden h-6 w-5 flex-none text-gray-400 sm:block"} />
															)}
															<div className="flex-auto">
																<div className="flex items-start gap-x-3">
																	<div className="text-sm font-medium leading-6 text-gray-900">{formatMoney(invoice.total, invoice.currency)}</div>
																	<div
																		className={clsx(
																			invoice.paid ? 'text-green-700 bg-green-50 ring-green-600/20' : 'text-red-700 bg-red-50 ring-red-600/10',
																			'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
																		)}
																	>
																		{invoice.paid ? 'Paid' : 'Unpaid'}
																	</div>
																</div>
																<div className="mt-1 text-xs leading-5 text-gray-500">{invoice.invoiceLines.length} line items</div>
															</div>
														</div>
														<div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
														<div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
													</td>
													<td className="hidden py-5 pr-6 sm:table-cell">
														<div className="text-sm leading-6 text-gray-900">{invoice.customer.name}</div>
														<div className="mt-1 text-xs leading-5 text-gray-500">{invoice.customer.streetAddress}, {invoice.customer.city}, {getCountryName(invoice.customer.country)}</div>
													</td>
													<td className="py-5 text-right">
														<div className="flex justify-end">
															<a
																href={`/invoices/${invoice.id}`}
																className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
															>
																View<span className="hidden sm:inline"> invoice</span>
															</a>
														</div>
														<div className="mt-1 text-xs leading-5 text-gray-500">
															Invoice <span className="text-gray-900">#{invoice.number}</span>
														</div>
													</td>
												</tr>
											))}
										</Fragment>
									))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</BaseLayout>
	)
}