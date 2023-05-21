import { RegisterRequest, SignInRequest } from '../requests/AuthRequests';
import Database from '../infrastructure/Database';
import { AppError } from '../middleware/Error';

export function getUserById(id: string) {
	return Database.user.findFirst({
		where: {
			id
		}
	});
}

export function checkUserSignIn(request: SignInRequest) {
	return Database.user.findFirst({
		where: {
			username: request.username,
			password: request.password
		}
	})
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