import { admin } from '../config/admin';
import { UserModel } from '../models/user-model';
import { createUser } from '../utils/create-user';

const createAdminUser = async () => await UserModel.findOneAndUpdate(
    { email: 'admin@admin.com' },
    await createUser(admin),
    { upsert: true }
);

export { createAdminUser };
