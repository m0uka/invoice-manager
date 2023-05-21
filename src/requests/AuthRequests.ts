import z from 'zod';

export const SignInRequestSchema = z.object({
	username: z.string(),
	password: z.string()
});

export type SignInRequest = z.infer<typeof SignInRequestSchema>;

export const RegisterRequestSchema  = z.object({
	username: z.string().min(2).max(32),
	password: z.string().min(8).max(128).regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;