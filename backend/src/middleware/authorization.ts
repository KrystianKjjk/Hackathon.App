import * as jwt from 'jsonwebtoken';

export const loggedUser = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({message: 'Operation possible for logged user only.'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send({message: 'Invalid token.'})
    }
}

export const isAdmin = function (req, res, next) {
    if(!req.user.isAdmin) return res.status(403).send({message: 'Forbidden.'});
    next();
}