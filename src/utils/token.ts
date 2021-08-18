import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export function signAccess(user: {}) {
  return jwt.sign(user, String(process.env.SECRET_ACCESS), { expiresIn: 900 });
}

export function signRefresh(user: {}) {
  return jwt.sign(user, String(process.env.SECRET_REFRESH), { expiresIn: 7776000 });
}
