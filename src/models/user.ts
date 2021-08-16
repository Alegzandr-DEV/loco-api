import { Schema, model } from 'mongoose';
import { User } from './types';
import { hash } from '../middlewares';

const schema = new Schema<User>({
  avatar: { type: String, required: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, minlength: 8, trim: true, required: true },
  roles: { type: Array, default: [] },
  username: { type: String, minlength: 4, unique: true, trim: true, required: true }
});

schema.pre('save', async function(next) {
  if(this.isModified('password'))
    this.password = await hash(this.password);
  next();
});

export const UserModel = model<User>('User', schema);
