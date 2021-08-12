import { Schema, model } from 'mongoose';
import { User } from './types';
import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

function merge(a: string, b: string) {
  return Array.from(a.length > b.length ? a : b, (_, i) => (a[i] || '') + (b[i] || '')).join('');
}

const schema = new Schema<User>({
  avatar: { type: String, select: false, required: true },
  email: { type: String, select: false, unique: true, trim: true, required: true },
  name: { type: String, unique: true, trim: true, required: true },
  password: { type: String, select: false, minlength: 8, trim: true, required: true }
});

schema.pre('save', async function(next) {
  if(this.isModified('password'))
    this.password = await bcrypt.hash(merge(this.password, String(process.env.SECRET_KEY)), 10);
  next();
});

export const UserModel = model<User>('User', schema);
