import z from 'zod';

export const CreateCustomerRequestSchema = z.object({
	name: z.string().min(1),
	streetAddress: z.string().optional(),
	postalCode: z.string().optional(),
	city: z.string().optional(),
	country: z.string().optional(),
	identificationNumber: z.string().optional(),
	taxExempt: z.boolean().optional()
});

export type CreateCustomerRequest = z.infer<typeof CreateCustomerRequestSchema>;
