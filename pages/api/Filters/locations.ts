import type { NextApiRequest, NextApiResponse } from 'next';
import Property from '@/models/Property.model';
import connectDb from '@/utils/connectDb';

// Retrieve all locations
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb();

    if (req.method === 'GET') {
        try {
            const locations = await Property.find().distinct('localGovernment');
            res.status(200).json({ locations });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the locations' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}