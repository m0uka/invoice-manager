import z, { boolean, date, number, string } from 'zod';

export const CreateInvoiceRequestSchema = z.object({
	customerId: string(),
	paid: boolean().optional(),
	dueAt: z.coerce.date().optional(),
	currency: string().length(3, 'use a currency code in the ISO 4217 format'),
});

export type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;

export const UpdateInvoiceRequestSchema = z.object({
	customerId: string(),
	paid: boolean().optional(),
	dueAt: z.coerce.date().optional(),
	currency: string().length(3, 'use a currency code in the ISO 4217 format'),
});

export type UpdateInvoiceRequest = z.infer<typeof UpdateInvoiceRequestSchema>;

export const CreateInvoiceLineRequestSchema = z.object({
	invoiceId: string(),
	lineText: string(),
	amount: number(),
	quantity: number()
});

export type CreateInvoiceLineRequest = z.infer<typeof CreateInvoiceLineRequestSchema>;

export const CreateInvoicePaymentRequestSchema = z.object({
	invoiceId: string(),
	paymentMethod: string(),
	amount: number(),
	externalPaymentId: string(),
	paidAt: z.coerce.date().optional()
});

export type CreateInvoicePaymentRequest = z.infer<typeof CreateInvoicePaymentRequestSchema>;