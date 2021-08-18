import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

export function signAccess(user: any) {
  try {
    return jwt.sign({
      id: user._id,
      avatar: user.avatar,
      email: user.email,
      roles: user.roles,
      username: user.username
    }, String(process.env.SECRET_ACCESS), { expiresIn: 900 });
  } catch (e) {
    return e;
  }
}

export function signRefresh(user: any) {
  try {
    return jwt.sign({ 
      id: user._id 
    }, String(process.env.SECRET_REFRESH), { expiresIn: 7776000 });
  } catch (e) {
    return e;
  }
}
