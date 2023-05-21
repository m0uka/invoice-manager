import Database from '../infrastructure/Database';
import { Customer, Prisma } from '@prisma/client';
import { createCustomer as createCustomerRepository, getCustomers as getCustomersRepository, deleteCustomer as deleteCustomerRepository } from '../repositories/CustomerRepository';
import { CreateCustomerRequest, CreateCustomerRequestSchema } from '../requests/CustomerRequests';

export async function getCustomers(cursor?: number, take: number = 100): Promise<Customer[]> {
	return getCustomersRepository(cursor, take);
}

export async function createCustomer(data: CreateCustomerRequest): Promise<Customer> {
	const parsed = CreateCustomerRequestSchema.parse(data);

	return createCustomerRepository({
		// TypeScript is crying because of the name type being optional in the zod validation, even though it is not.
		name: parsed.name,
		...parsed,
	});
}

export async function deleteCustomer(id: string) {
	return deleteCustomerRepository(id);
}