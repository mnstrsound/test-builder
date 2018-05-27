import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/user-model';
import { userPasswordSalt, jwtSignSalt } from '../config/salts';
import { admin } from '../config/admin';

const loginRoutes = (router) => {
    router.post('/api/login', async (ctx) => {
        const { email, password } = ctx.request.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            ctx.status = 400;
            ctx.body = {
                error: 'Неверный логин/пароль'
            };
        } else {
            const { hash_password } = user;
            const isValidPassword = bcrypt.compareSync(`${password}${userPasswordSalt}`, hash_password);

            if (!isValidPassword) {
                ctx.status = 400;
                ctx.body = {
                    error: 'Неверный логин/пароль'
                };
            } else {
                const token = jwt.sign(user.toJSON(), jwtSignSalt);
                const isAdmin = user.email === admin.email;
                const { hash_password, ...userToSend } = user;
                ctx.status = 200;
                ctx.body = { token, user: userToSend, isAdmin };
            }
        }
    });
};

export { loginRoutes };
