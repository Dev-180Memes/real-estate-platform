import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User.model';
import connectDb from '@/utils/connectDb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb();
    
    if (req.method === 'POST') {
        const { email, username, password } = req.body;
    
        if (!email || !username || !password) {
            return res.status(422).json({ error: 'Please fill in all fields' });
        }
    
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        return res.status(201).json({ message: 'User registered successfully', token });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
}