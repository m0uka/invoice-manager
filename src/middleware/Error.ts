import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
	status?: number;

	constructor(message: string, status?: number) {
		super();

		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = message ?? 'Something went wrong.';
		this.status = status ?? 500;
	}
}

interface ErrorResponse {
	status: number;
	name: string;
	message: string;
	stack?: string;
}

export default function handleError(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
	const isProd = process.env.NODE_ENV === 'production';

	let status = 500;
	if ('status' in err) {
		status = err.status;
	}

	const response: ErrorResponse = {
		status,
		name: err.name,
		message: 'Something went wrong.',
	}

	if (!isProd) {
		response.stack = err.stack;
	}

	if (status < 500 || !isProd) {
		response.message = err.message;
	}

	res.status(status).json(response);
}