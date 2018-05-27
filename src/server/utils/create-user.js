import { hashPassword } from '../utils/hash-password';

const createUser = async ({ password, ...user }) => ({
    ...user,
    hash_password: await hashPassword(password)
});

export { createUser };
