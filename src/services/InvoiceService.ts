import { Invoice, InvoiceLine, InvoicePayment } from '@prisma/client';
import {
	CreateInvoiceLineRequest,
	CreateInvoiceLineRequestSchema,
	CreateInvoicePaymentRequest,
	CreateInvoicePaymentRequestSchema,
	CreateInvoiceRequest,
	CreateInvoiceRequestSchema,
	UpdateInvoiceRequest,
	UpdateInvoiceRequestSchema
} from '../requests/InvoiceRequests';
import {
	createInvoice as createInvoiceRepository,
	updateInvoice as updateInvoiceRepository,
	createInvoiceLine as createInvoiceLineRepository,
	createInvoicePayment as createInvoicePaymentRepository,
	getInvoice as getInvoiceRepository,
	getInvoices as getInvoicesRepository
} from '../repositories/InvoiceRepository';

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

export async function updateInvoice(id: string, request: UpdateInvoiceRequest): Promise<Invoice> {
	const parsed = UpdateInvoiceRequestSchema.parse(request);
	return await updateInvoiceRepository(id, parsed);
}

export async function createInvoiceLine(request: CreateInvoiceLineRequest): Promise<InvoiceLine> {
	CreateInvoiceLineRequestSchema.parse(request);

	return await createInvoiceLineRepository({
		invoice: {
			connect: {
				id: request.invoiceId
			}
		},
		lineText: request.lineText,
		amount: request.amount,
		quantity: request.quantity,
	});
}

export async function createInvoicePayment(request: CreateInvoicePaymentRequest): Promise<InvoicePayment> {
	CreateInvoicePaymentRequestSchema.parse(request);

	return await createInvoicePaymentRepository({
		invoice: {
			connect: {
				id: request.invoiceId
			}
		},
		amount: request.amount,
		paidAt: request.paidAt,
		paymentMethod: request.paymentMethod
	});
}