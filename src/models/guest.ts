import { Schema, model } from 'mongoose';
import { Guest } from './types';
import { generateUsername } from '../utils';

// Need to add expire time
const schema = new Schema<Guest>({
  avatar: { type: String, required: true },
  username: { type: String }
}, { timestamps: true });

//schema.index({ createdAt: 1 }, { expiresAfterSeconds: 86400 });

schema.pre('save', async function(next) {
  this.username = generateUsername();
  next();
});

export const GuestModel = model<Guest>('Guest', schema);
