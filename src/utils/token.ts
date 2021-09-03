import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { createHmac } from 'crypto';

dotenv.config();

export function signAccess(user: any) {
  try {
    const secretKey = createHmac('sha256', String(process.env.SECRET_ACCESS)).digest('hex');
    return jwt.sign({
      id: user._id,
      avatar: user.avatar,
      email: user.email,
      roles: user.roles,
      username: user.username
    }, secretKey, { expiresIn: 900 });
  } catch (error) {
    return error;
  }
}

export function signRefresh(user: any) {
  try {
    const secretKey = createHmac('sha256', String(process.env.SECRET_REFRESH)).digest('hex');
    return jwt.sign({ 
      id: user._id 
    }, secretKey, { expiresIn: 15780000 });
  } catch (error) {
    return error;
  }
}

export function decodeAccess(token: any) {
  try {
    const secretKey = createHmac('sha256', String(process.env.SECRET_ACCESS)).digest('hex');
    return jwt.verify(token, secretKey);
  } catch (error) {
    return error;
  }
}
