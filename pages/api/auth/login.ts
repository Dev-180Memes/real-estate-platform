import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/utils/connectDb';
import User from '@/models/User.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb();

    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'Please fill in all fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        return res.status(200).json({ message: 'User logged in successfully', token });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}