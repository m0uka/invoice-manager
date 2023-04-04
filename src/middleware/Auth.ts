import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export type ActorType = 'anonymous' | 'user' | 'api_key';

export class Actor {
    type: ActorType;
    id?: string;

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

export function parseActor(req: Request, res: Response, next: NextFunction) {
    let actorType: ActorType = 'anonymous';

    const accessToken = req.header('X-AccessToken');
    if (accessToken) {
        actorType = 'user';
    }

    if (actorType === 'user') {
        const decoded = jwt.verify(accessToken!, process.env.JWT_SECRET, {
            complete: true
        });

        console.log(decoded);
        /*req.actor = new Actor('user', decoded.payload.user_id);*/
    }

    if (actorType === 'anonymous') {
        req.actor = new Actor('anonymous');
    }

    next();
}
