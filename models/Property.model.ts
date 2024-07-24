import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperty extends Document {
    propertyTitle: string;
    streetAddress: string;
    localGovernment: string;
    listType: 'rent' | 'sale';
    price: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    agentName: string;
    agentEmail: string;
    agentPhone: string;
    images: string;
}

const PropertySchema: Schema = new Schema({
    propertyTitle: { type: String, required: true },
    streetAddress: { type: String, required: true },
    localGovernment: { type: String, required: true },
    listType: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    description: { type: String, required: true },
    agentName: { type: String, required: true },
    agentEmail: { type: String, required: true },
    agentPhone: { type: String, required: true },
    images: { type: String, required: true },
});

const Property: Model<IProperty> = mongoose.models.Property || mongoose.model('Property', PropertySchema);

export default Property;