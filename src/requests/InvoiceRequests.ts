import z, { boolean, date, string } from 'zod';

export const CreateInvoiceRequestSchema = z.object({
	customerId: string(),
	paid: boolean().optional(),
	dueAt: date().optional(),
	currency: string().length(3, 'use a currency code in the ISO 4217 format'),
});

export type CreateInvoiceRequest = z.infer<typeof CreateInvoiceRequestSchema>;