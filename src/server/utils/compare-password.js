import bcrypt from 'bcrypt';

import { userPasswordSalt } from '../config/salts';

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(`${password}${userPasswordSalt}`, hashedPassword);
}

export { comparePassword };
