import jwt from 'jsonwebtoken';
import { promisify } from 'util';
require('dotenv').config();

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({error: 'Token não existe.'});
    }
    
    const [, token] = authHeader.split(' ');
    try {
        const decode = await promisify(jwt.verify)(token, process.env.SECRET);
        req.userId = decode.id;
        return next();
    } catch(err) {
        return res.status(401).json({error: 'Token não existe.'});
    }
}