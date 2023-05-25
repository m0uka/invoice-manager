import Database from '../infrastructure/Database';
import { AppError } from '../middleware/Error';
import { Prisma } from '@prisma/client';

export function findUserSettings(userId: string) {
	return Database.userSettings.findFirst({
		where: {
			userId
		},
	});
}

export async function upsertUserSettings(userId: string, settings: Omit<Prisma.UserSettingsCreateInput, "user">) {
	try {
		return await Database.userSettings.upsert({
			where: {
				userId
			},
			update: {
				user: {
					connect: {
						id: userId
					}
				},
				...settings
			},
			create: {
				user: {
					connect: {
						id: userId
					}
				},
				...settings
			}
		});
	}
	catch (err: any) {
		// Non-existing relation error (user id)
		if (err.code === 'P2025') {
			throw new AppError('Invalid relation ID(s).', 400);
		}

		throw err;
	}
}