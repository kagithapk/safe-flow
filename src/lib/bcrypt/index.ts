import bcrypt from 'bcryptjs';

export const SALT = process.env.BCRYPT_SALT;

export { bcrypt };
