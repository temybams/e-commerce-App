
import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

        res.status(201).json({ token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '30d' });

        res.status(200).json({ token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
