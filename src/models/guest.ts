import { Schema, model } from 'mongoose';
import { Guest } from './types';
import { generateUsername } from '../utils';

const schema = new Schema<Guest>({
  avatar: { type: String, required: true },
  roles: { type: Array, default: ['guest'] },
  username: { type: String, minlength: 4, unique: true, trim: true, required: true }
}, { timestamps: true });

schema.pre('save', async function(next) {
  this.username = generateUsername();
  next();
});

export const GuestModel = model<Guest>('Guest', schema);
