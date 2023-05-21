import Database from '../infrastructure/Database';
import { Invoice, Prisma } from '@prisma/client';

export async function getInvoice(id: string) {
	return Database.invoice.findUnique({
		where: {
			id
		},
		include: {
			invoicePayments: true,
			invoiceLines: true
		}
	})
}

export async function getInvoices(cursor?: number, take: number = 100, where?: Prisma.InvoiceWhereInput): Promise<Invoice[]> {
	return Database.invoice.findMany({
		take,
		where,
		cursor: cursor ? {
			number: cursor,
		} : undefined,
		orderBy: {
			number: 'desc'
		},
	});
}

export async function createInvoice(invoice: Prisma.InvoiceCreateInput): Promise<Invoice> {
	return Database.invoice.create({
		data: invoice,
	});
}