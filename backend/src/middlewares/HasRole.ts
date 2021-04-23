import * as express from 'express';
const jwt = require('jsonwebtoken');

export const isAdmin = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token: string = req.header('x-auth-token');
    if(!token) return res.status(401).json({message: 'UNAUTHORIZED'});
    try {
        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return payload.isAdmin ? next() : res.status(403).json({message: 'FORBIDDEN'});
    }
    catch {
        res.status(400).json({message: 'INVALID TOKEN'});
    }
}

export const HasId = (idParam: string, reqProp: 'body' | 'params' = 'params') => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token: string = req.header('x-auth-token');
    if(!token) return res.status(401).json({message: 'UNAUTHORIZED'});
    try {
        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const id = req[reqProp][idParam];
        return id === payload._id ? next() : res.status(403).json({message: 'FORBIDDEN'});
    }
    catch {
        res.status(400).json({message: 'INVALID TOKEN'});
    }

}
