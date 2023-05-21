import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './Error';
import { User } from '@prisma/client';
import { findUserById } from '../services/AuthService';

export type ActorType = 'anonymous' | 'user' | 'api_key';

export class Actor {
    type: ActorType;
    id?: string;
    user?: User;

    setUser(user: User) {
        this.user = user;
    }

    constructor(type: ActorType, id?: string) {
        this.type = type;
        if (id) this.id = id;
    }
}


declare module 'express-serve-static-core' {
    interface Request {
        actor: Actor
    }
}

export async function parseActor(req: Request, res: Response, next: NextFunction) {
    let actorType: ActorType = 'anonymous';

    const authHeader = req.header('Authorization');
    const authSplit = authHeader?.split(' ');

    const authType = authSplit?.[0].toLowerCase();
    const authValue = authSplit?.[1];

    if (authType === 'user') {
        actorType = 'user';
    } else if (authType === 'apikey') {
        actorType = 'api_key';
    }

    if (actorType === 'user') {
        const decoded = jwt.verify(authValue!, process.env.JWT_SECRET, {
            complete: true
        });

        req.actor = new Actor('user', decoded.payload['id']);

        const user = await findUserById(req.actor.id);
        req.actor.setUser(user);
    } else if (actorType === 'api_key') {
        throw new AppError('API key authorization is not yet implemented.', 501);
    } else {
        req.actor = new Actor('anonymous');
    }

    next();
}

export function authorized(req: Request, res: Response, next: NextFunction) {
    if (req.actor.type === 'anonymous') {
        throw new AppError('You are not authorized to perform this action.', 403);
    }

    next();
}