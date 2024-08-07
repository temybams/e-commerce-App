import { Request, Response } from 'express';
import User from '../models/userModel';
import { generateToken, setTokenCookie } from '../utils/tokenGeneration';

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }

    try {
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already taken.' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id.toString());
        setTokenCookie(res, token);

        res.status(201).json({ token, message: 'User registered successfully.' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isPasswordMatch = await user.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = generateToken(user._id.toString());
        setTokenCookie(res, token);

        res.status(200).json({ token, message: 'Logged in successfully.' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
