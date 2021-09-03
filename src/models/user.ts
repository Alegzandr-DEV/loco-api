import { Schema, model } from 'mongoose';
import { User } from './types';
import { hash } from '../utils';

const schema = new Schema<User>({
  avatar: { type: String, required: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, minlength: 8, trim: true, required: true },
  refreshToken: { type: String, default: '' },
  roles: { type: Array, default: ['user'] },
  username: { type: String, minlength: 4, unique: true, trim: true, required: true }
}, { timestamps: true });

schema.pre('save', async function(next) {
  if(this.isModified('password'))
    this.password = await hash(this.password);
  next();
});

export const UserModel = model<User>('User', schema);
