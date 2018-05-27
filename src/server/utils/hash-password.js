import bcrypt from 'bcrypt';

import { userPasswordSalt } from '../config/salts';

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(`${password}${userPasswordSalt}`, saltRounds);
}

export { hashPassword };
