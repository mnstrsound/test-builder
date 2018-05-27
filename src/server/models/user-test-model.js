import { getConnection } from '../mongo';

const mongoose = getConnection();
const Schema = mongoose.Schema;

const UserTestSchema = new Schema({
    userId: String,
    testId: String,
    answers: [[String]]
});

const UserTestModel = mongoose.model('UserTest', UserTestSchema);

export { UserTestModel };
