import { RegisterRequest, SignInRequest } from '../requests/AuthRequests';
import Database from '../infrastructure/Database';
import { AppError } from '../middleware/Error';
import argon2 from 'argon2';

export function getUserById(id: string) {
	return Database.user.findFirst({
		where: {
			id
		}
	});
}

export async function checkUserSignIn(request: SignInRequest) {
	const response = await Database.user.findFirst({
		where: {
			username: request.username,
		}
	})

	if (!await argon2.verify(response.password, request.password)) {
		return null;
	}

	return response;
}

export async function createUser(request: RegisterRequest) {
	try {
		return await Database.user.create({
			data: {
				username: request.username,
				password: request.password
			}
		});
	}
	catch (err: any) {
		// Unique constraint error
		if (err.code === 'P2002') {
			throw new AppError('A user with this username already exists.', 400);
		}

		throw err;
	}
}