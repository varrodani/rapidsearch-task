import mongoose, { Schema, Document } from 'mongoose';

export interface ISecret extends Document {
    hash: string;
    secretText: string;
    createdAt: number;
    expiresAt: number;
}

const SecretSchema: Schema = new Schema({
    hash: { type: String, required: true, unique: true },
    secretText: { type: String, required: true },
    createdAt: { type: Number, required: true },
    expiresAt: { type: Number, required: true }
});

export default mongoose.model<ISecret>('Secret', SecretSchema);


