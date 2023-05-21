import { Customer, Prisma } from '@prisma/client';
import Database from '../infrastructure/Database';

export async function getCustomers(cursor?: number, take: number = 100, where?: Prisma.CustomerWhereInput): Promise<Customer[]> {
	return Database.customer.findMany({
		take,
		where,
		cursor: cursor ? {
			number: cursor,
		} : undefined,
		orderBy: {
			number: 'desc'
		}
	});
}

export async function createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
	return Database.customer.create({
		data,
	});
}

export async function deleteCustomer(id: string) {
	return Database.customer.delete({
		where: {
			id
		}
	});
}