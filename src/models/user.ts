import { Schema, model } from 'mongoose';
import { User } from './types';

export const UserModel = model<User>('User', new Schema<User>({
  avatar: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}));
