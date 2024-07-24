import type { NextApiRequest, NextApiResponse } from 'next';
import Property from '@/models/Property.model';
import connectDb from '@/utils/connectDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb();

    if (req.method === 'POST') {
        try {
            const {
                propertyTitle,
                streetAddress,
                localGovernment,
                listType,
                price,
                bedrooms,
                bathrooms,
                description,
                agentName,
                agentEmail,
                agentPhone,
                images,
            } = req.body;

            const property = await Property.create({
                propertyTitle,
                streetAddress,
                localGovernment,
                listType,
                price,
                bedrooms,
                bathrooms,
                description,
                agentName,
                agentEmail,
                agentPhone,
                images,
            });
            
            res.status(201).json({ property });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the property' });
        }
    } else if (req.method === 'GET') {
        try {
            const properties = await Property.find();
            res.status(200).json({ properties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching the properties' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}