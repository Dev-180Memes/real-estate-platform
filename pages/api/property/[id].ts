import type { NextApiRequest, NextApiResponse } from 'next';
import Property from '@/models/Property.model';
import connectDb from '@/utils/connectDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await connectDb();
        const { id } = req.query;
        try {
            const property = await Property.findById(id);
            if (!property) {
                return res.status(404).json({ success: false, message: 'Property not found' });
            }
            res.status(200).json({ success: true, data: property });
        } catch (error) {
            res.status(400).json({ success: false, message: 'Error fetching property' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid request' });
    }
}