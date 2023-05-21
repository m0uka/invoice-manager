import { Invoice } from '@prisma/client';
import { CreateInvoiceRequest, CreateInvoiceRequestSchema } from '../requests/InvoiceRequests';
import { createInvoice as createInvoiceRepository, getInvoice as getInvoiceRepository, getInvoices as getInvoicesRepository } from '../repositories/InvoiceRepository';


export async function getInvoiceById(id: string) {
	return await getInvoiceRepository(id);
}

export async function getInvoices(cursor?: number, take: number = 100): Promise<Invoice[]> {
	return await getInvoicesRepository(cursor, take);
}

export async function createInvoice(request: CreateInvoiceRequest): Promise<Invoice> {
	CreateInvoiceRequestSchema.parse(request);

	return await createInvoiceRepository({
		customer: {
			connect: {
				id: request.customerId
			}
		},
		dueAt: request.dueAt,
		paid: request.paid,
		currency: request.currency
	});
}