import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, Cog6ToothIcon, DocumentDuplicateIcon, HomeIcon, UsersIcon, XMarkIcon, } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';
import { useAuthState } from '../../stores/authStore';
import { useLocation } from 'react-router-dom';

const navigation = [
	{name: 'Dashboard', href: '/', icon: HomeIcon, exact: true},
	{name: 'Invoices', href: '/invoices', icon: DocumentDuplicateIcon},
	{name: 'Customers', href: '/customers', icon: UsersIcon},
]

interface Props {
	children: React.ReactNode;
}

export default function BaseLayout(props: Props) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const authState = useAuthState()
	const location = useLocation();

	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-900/80"/>
						</Transition.Child>

						<div className="fixed inset-0 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
											<button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
												<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
											</button>
										</div>
									</Transition.Child>
									<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
										<div className="flex h-16 shrink-0 items-center">
											<span className="font-semibold text-2xl text-white">Invoice Manager</span>
										</div>
										<nav className="flex flex-1 flex-col">
											<ul role="list" className="flex flex-1 flex-col gap-y-7">
												<li>
													<ul role="list" className="-mx-2 space-y-1">
														{navigation.map((item) => (
															<li key={item.name}>
																<a
																	href={item.href}
																	className={clsx(
																		(item.exact ? location.pathname === item.href : location.pathname.startsWith(item.href))
																			? 'bg-gray-800 text-white'
																			: 'text-gray-400 hover:text-white hover:bg-gray-800',
																		'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
																	)}
																>
																	<item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
																	{item.name}
																</a>
															</li>
														))}
													</ul>
												</li>
												<li className="mt-auto">
													<a
														href="/settings"
														className={clsx(
															location.pathname.startsWith('/settings')
																? 'bg-gray-800 text-white'
																: 'text-gray-400 hover:text-white hover:bg-gray-800',
															'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
														)}
													>
														<Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
														Settings
													</a>
												</li>
											</ul>
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
						<div className="flex h-16 shrink-0 items-center">
							<span className="font-semibold text-2xl text-white">Invoice Manager</span>
						</div>
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-1">
										{navigation.map((item) => (
											<li key={item.name}>
												<a
													href={item.href}
													className={clsx(
														(item.exact ? location.pathname === item.href : location.pathname.startsWith(item.href))
															? 'bg-gray-800 text-white'
															: 'text-gray-400 hover:text-white hover:bg-gray-800',
														'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
													)}
												>
													<item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</li>
								<li className="mt-auto">
									<a
										href="/settings"
										className={clsx(
											location.pathname.startsWith('/settings')
												? 'bg-gray-800 text-white'
												: 'text-gray-400 hover:text-white hover:bg-gray-800',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
										)}
									>
										<Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
										Settings
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className="lg:pl-72">
					<div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
						<button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
							<Bars3Icon className="h-6 w-6" aria-hidden="true"/>
						</button>

						<div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

						<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
							<div className="relative flex flex-1" />
							<div className="flex items-center gap-x-4 lg:gap-x-6">
								<Menu as="div" className="relative">
									<Menu.Button className="-m-1.5 flex items-center p-1.5">
										<span className="hidden lg:flex lg:items-center">
										  <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
											{authState.username}
										  </span>
										  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
										</span>
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
										<Menu.Items
											className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
											<Menu.Item>
												{({active}) => (
													<a
														href={'#'}
														onClick={() => authState.signOut()}
														className={clsx(
															active ? 'bg-gray-50' : '',
															'block px-3 py-1 text-sm leading-6 text-gray-900'
														)}
													>
														Sign out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<main className="py-10">
						<div className="px-4 sm:px-6 lg:px-8">
							{props.children}
						</div>
					</main>
				</div>
			</div>
		</>
	)
}