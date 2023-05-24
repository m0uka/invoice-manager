import jwt from 'jsonwebtoken';
import { RegisterRequest, RegisterRequestSchema, SignInRequest, SignInRequestSchema } from '../requests/AuthRequests';
import { checkUserSignIn, createUser, getUserById } from '../repositories/AuthRepository';
import { AppError } from '../middleware/Error';
import { User } from '@prisma/client';
import argon2 from 'argon2';

export function createUserJWT(user: User) {
    return jwt.sign({
        id: user.id,
        username: user.username,
    }, process.env.JWT_SECRET);
}

export async function findUserById(id: string) {
    return getUserById(id);
}

export async function signInUser(request: SignInRequest) {
    SignInRequestSchema.parse(request);

    const user = await checkUserSignIn(request);
    if (!user) {
        throw new AppError('Incorrect username or password.', 403);
    }

    return createUserJWT(user);
}

export async function registerUser(request: RegisterRequest) {
    RegisterRequestSchema.parse(request);

    const hashedPassword = await argon2.hash(request.password);
    request.password = hashedPassword;

    await createUser(request);
    return await signInUser({
        username: request.username,
        password: hashedPassword
    });
}