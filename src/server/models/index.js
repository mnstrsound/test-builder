import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

import { db } from '../config/db';

const TestModel = db.define('test', {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING }
});

const QuestionModel = db.define('question', {
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING }
});

const AnswerModel = db.define('answer', {
    content: { type: Sequelize.STRING },
    checked: { type: Sequelize.BOOLEAN }
});

TestModel.hasMany(QuestionModel, {
    foreignKey: 'test_id',
    onDelete: 'CASCADE'
});
QuestionModel.belongsTo(TestModel, { foreignKey: 'test_id' });

QuestionModel.hasMany(AnswerModel, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE'
});
AnswerModel.belongsTo(QuestionModel, { foreignKey: 'question_id' });


// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
    _.times(10, async () => {
        const test = await TestModel.create({
            title: casual.title,
            description: casual.title
        });
        const question = await QuestionModel.create({
            title: casual.title,
            content: casual.title
        });
        const answer = await AnswerModel.create({
            content: casual.title
        });
        await question.addAnswer(answer);
        await test.addQuestion(question);
    });
});

const Test = db.models.test;
const Question = db.models.question;
const Answer = db.models.answer;

export { Test, Question, Answer };
