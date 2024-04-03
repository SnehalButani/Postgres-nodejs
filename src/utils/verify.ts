import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ message: "Unauthorized" });

        const token = header.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decode = jwt.verify(token, "postgresnodejs")
        if (!token) return res.status(401).json({ message: "Token not valid" });

        req['user'] = decode;

        next();
    } catch (error) {
        next(error)
    }
}