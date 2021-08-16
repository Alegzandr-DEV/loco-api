import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export function sign(user: { id: string }) {
  return jwt.sign(user, String(process.env.SECRET));
}

export function verify(token: string) {
  return jwt.verify(token, String(process.env.SECRET));
}
