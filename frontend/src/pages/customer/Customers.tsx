import BaseLayout from '../../components/layout/BaseLayout';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import React, { Fragment } from 'react';
import { ArrowPathIcon, ArrowUpCircleIcon, UserIcon } from '@heroicons/react/20/solid';
import { formatMoney, getCountryName } from '../../api';
import clsx from 'clsx';

export default function Customers() {
	const customers = useQuery({
		queryKey: ['customers'],
		queryFn: async () => {
			const response = await axios.get('/v1/customers');
			return response.data;
		}
	})

	return (
		<BaseLayout>
			{customers.isLoading ? <LoadingIndicator /> : (
				<div>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
							Customers
						</h2>
					</div>
					<div className="mt-6 overflow-hidden border-t border-gray-100">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
								<table className="w-full text-left">
									<tbody>
									{customers.data.map((customer: any) => (
										<tr key={customer.id}>
											<td className="relative py-5 pr-6">
												<div className="flex gap-x-6">
													<UserIcon className={"hidden h-6 w-5 flex-none text-gray-400 sm:block"} />

													<div className="flex-auto">
														<div className="flex items-start gap-x-3">
															<div className="text-sm font-medium leading-6 text-gray-900">{customer.name}</div>
															{customer.taxExempt && (
																<div
																	className={clsx(
																		'text-blue-700 bg-blue-50 ring-blue-600/20',
																		'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
																	)}
																>
																	Tax Exempt
																</div>
															)}
														</div>
														<div className="mt-1 text-xs leading-5 text-gray-500">{customer.identificationNumber}</div>
													</div>
												</div>
												<div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
												<div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
											</td>
											<td className="hidden py-5 pr-6 sm:table-cell">
												<div className="text-sm leading-6 text-gray-900">{customer.streetAddress}, {customer.city}, {getCountryName(customer.country)}</div>
												<div className="mt-1 text-xs leading-5 text-gray-500">{customer.id}</div>
											</td>
											<td className="py-5 text-right">
												<div className="flex justify-end">
													<a
														href={`/customers/${customer.id}`}
														className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
													>
														View<span className="hidden sm:inline"> customer</span>
													</a>
												</div>
												<div className="mt-1 text-xs leading-5 text-gray-500">
													Customer <span className="text-gray-900">#{customer.number}</span>
												</div>
											</td>
										</tr>
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