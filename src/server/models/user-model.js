import { getConnection } from '../mongo';

const mongoose = getConnection();
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    patronymic: String,
    email: String,
    hash_password: String
});

const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
