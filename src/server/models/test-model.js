import { getConnection } from '../mongo';

const mongoose = getConnection();
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    title: String,
    description: String,
    questions: [
        {
            title: String,
            content: String,
            answers: [
                {
                    content: String,
                    isCorrect: Boolean
                }
            ]
        }
    ]
});

const TestModel = mongoose.model('Test', TestSchema);

export { TestModel };
