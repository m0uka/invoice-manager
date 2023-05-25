import z, { boolean, string } from 'zod';

export const UpdateSettingsRequestSchema = z.object({
	name: string().optional(),
	streetAddress: string().optional(),
	postalCode: string().optional(),
	city: string().optional(),
	country: string().optional(),
	identificationNumber: string().optional(),
	vatPayer: boolean().optional(),
	preferredCurrency: string().length(3),
	additionalText: string().optional()
});

export type UpdateSettingsRequest = z.infer<typeof UpdateSettingsRequestSchema>;