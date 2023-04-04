import jwt from "jsonwebtoken";

export function createUserJWT(userId: string) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token;
}