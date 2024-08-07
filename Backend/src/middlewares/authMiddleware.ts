import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            [, token] = req.headers.authorization.split(' ');
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            console.log('No token found');
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // console.log('Token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userID: string };
        // console.log('Decoded JWT:', decoded);

        req.user = decoded.userID;
        console.log('Assigned req.user:', req.user);

        const currentUser = await User.findById(decoded.userID);
        if (!currentUser) {
            console.log('User not found');
            return res.status(401).json({ message: 'User not found' });
        }

        // console.log('User found:', currentUser);
        res.locals.user = currentUser;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};
