import React from 'react';
import Spinner from './Spinner';

export default function LoadingIndicator() {
	return (
		<div className="flex justify-center items-center h-full">
			<div className="p-6 flex flex-col h-full text-gray-700 dark:text-white">
				<Spinner className="mx-auto" customSize="w-12"/>
				<h2 className="mt-6 font-semibold text-2xl mx-auto text-center">Loading</h2>
				<h3 className="mx-auto text-center">This will only take a while...</h3>
			</div>
		</div>
	)
}