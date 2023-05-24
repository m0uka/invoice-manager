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


axios.defaults.baseURL = BASE_URL;