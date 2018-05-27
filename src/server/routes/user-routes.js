import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user-model';
import { TestModel } from '../models/test-model';
import { UserTestModel } from '../models/user-test-model';
import { routeBuilder } from './route-builder';
import { generatePassword } from '../utils/generate-password';
import { createUser } from '../utils/create-user';

const getUserFromToken = (ctx) => {
    const token = ctx.headers.authorization.replace('Bearer: ', '');
    return jwt.decode(token);
}


const userRoutes = router => routeBuilder(router, 'api/user', UserModel, [
    {
        method: 'post',
        route: '',
        handler: async (ctx) => {
            ctx.body = await new UserModel(
                await createUser({
                    ...ctx.request.body,
                    password: generatePassword()
                })
            ).save();
        }
    },
    {
        method: 'get',
        route: 'tests',
        handler: async (ctx) => {
            const user = getUserFromToken(ctx);
            let tests = await TestModel.find({ usersIds: user._id });
            const answers = await Promise.all(
                tests.map(test => UserTestModel.findOne({ userId: user._id, testId: test._id }))
            );
            // tests.forEach((test, index) => test.userAnswers = testsAnswers[index]);
            // tests.forEach((test) => {
            //     console.log(test);
            //     if (test.userAnswers) {
            //         let rightAnswers = 0;
            //         test.questions.forEach((question, index) => {
            //             const questionAnswers = question.answers.sort().join();
            //             const userAnswers = test.userAnswers.answers[index].sort().join();
            //             if (questionAnswers === userAnswers) rightAnswers += 1;
            //         });
            //         test.mark = parseInt((rightAnswers / test.questions) * 100, 10);
            //     }
            //     return test;
            // });
            ctx.body = { tests, answers };
        }
    },
    {
        method: 'post',
        route: 'test',
        handler: async (ctx) => {
            const user = getUserFromToken(ctx);
            const userTest = { userId: user._id, ...ctx.request.body };
            await new UserTestModel(userTest).save();
            ctx.body = await TestModel.find({ usersIds: user._id });
        }
    },
    {
        method: 'get',
        route: 'current',
        handler: async (ctx) => {
            const user = getUserFromToken(ctx);
            const { hash_pasword, ...userToSend } = user;

            ctx.body = { user: userToSend };
        }
    }
]);

export { userRoutes };
