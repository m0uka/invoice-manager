import axios from 'axios';
export const BASE_URL = 'http://localhost:3000/api';

export interface ErrorResponse {
	status: number;
	name: string;
	message: string;
}

export class Result<T> {
	public value?: T;
	public error?: ErrorResponse;

	private constructor(error?: ErrorResponse, value?: T) {
		this.error = error;
		this.value = value;
	}

	public static OK<U>(value?: U): Result<U> {
		return new Result<U>(undefined, value);
	}

	public static Failure<U>(error: ErrorResponse): Result<U> {
		return new Result<U>(error, undefined);
	}
}

export function formatMoney(amount: number, currency: string) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency
	});

	return formatter.format(amount);
}

export function getCountryName(isoCode: string) {
	return new Intl.DisplayNames(['en'], {type: 'region'}).of(isoCode?.toUpperCase());
}

axios.defaults.baseURL = BASE_URL;

// Can't be arsed making a proper Authenticated component
axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 403) {
		//return window.location.href = '/auth';
	}

	return Promise.reject(error);
});

axios.interceptors.request.use(
	function (config) {
		const token = localStorage.getItem('jwt');
		if (token && token !== "null" && token !== "undefined") {
			config.headers['Authorization'] = 'User ' + token;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
