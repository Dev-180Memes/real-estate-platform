import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;