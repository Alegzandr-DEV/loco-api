import * as bcrypt from 'bcrypt';

export function hash(password: string) {
  return bcrypt.hash(password, 10);
}

export function compare(userPassword: string, password: string) {
  return bcrypt.compareSync(userPassword, password);
}
