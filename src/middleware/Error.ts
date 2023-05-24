import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

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
	errors?: ZodIssue[];
}

export default function handleError(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
	const isProd = process.env.NODE_ENV === 'production';

	let status = 500;
	if ('status' in err) {
		status = err.status;
	}

	if (err instanceof ZodError) {
		const zodErrorResponse: ErrorResponse = {
			status: 400,
			name: 'ValidationError',
			message: 'Form body validation failed.',
			errors: err.errors
		}

		res.status(400).json(zodErrorResponse);
		return;
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