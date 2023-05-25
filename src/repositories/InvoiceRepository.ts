import Database from '../infrastructure/Database';
import { Invoice, InvoiceLine, InvoicePayment, Prisma } from '@prisma/client';
import { AppError } from '../middleware/Error';

export async function getInvoice(id: string) {
	return Database.invoice.findUnique({
		where: {
			id
		},
		include: {
			invoicePayments: true,
			invoiceLines: true,
			customer: true
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
		include: {
			invoiceLines: true,
			customer: true,
		}
	});
}

export async function updateInvoice(id: string, invoice: Prisma.InvoiceUpdateInput): Promise<Invoice> {
	try {
		return await Database.invoice.update({
			where: {
				id
			},
			data: invoice,
		});
	}
	catch (err: any) {
		// Non-existing relation error (customer id)
		if (err.code === 'P2025') {
			throw new AppError('Invalid relation ID(s).', 400);
		}

		throw err;
	}
}

export async function createInvoice(invoice: Prisma.InvoiceCreateInput): Promise<Invoice> {
	try {
		return await Database.invoice.create({
			data: invoice,
		});
	}
	catch (err: any) {
		// Non-existing relation error (customer id)
		if (err.code === 'P2025') {
			throw new AppError('Invalid relation ID(s).', 400);
		}

		throw err;
	}
}

export async function createInvoiceLine(invoiceLine: Prisma.InvoiceLineCreateInput): Promise<InvoiceLine> {
	try {
		return await Database.invoiceLine.create({
			data: invoiceLine,
		});
	}
	catch (err: any) {
		// Non-existing relation error (invoice id)
		if (err.code === 'P2025') {
			throw new AppError('Invalid relation ID(s).', 400);
		}

		throw err;
	}
}

export async function createInvoicePayment(invoicePayment: Prisma.InvoicePaymentCreateInput): Promise<InvoicePayment> {
	try {
		return await Database.invoicePayment.create({
			data: invoicePayment,
		});
	}
	catch (err: any) {
		// Non-existing relation error (invoice id)
		if (err.code === 'P2025') {
			throw new AppError('Invalid relation ID(s).', 400);
		}

		throw err;
	}
}