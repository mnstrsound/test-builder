import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBody from 'koa-body';
import pug from 'js-koa-pug';
import { authMiddleware } from './middlewares/auth';
import { routes, allowedMethods } from './routes';
import { initConnection } from './mongo';
import { createAdminUser } from './utils/create-admin-user';

initConnection();
createAdminUser();

const app = new Koa();
// app.use(passport.initialize());
app.use(authMiddleware);
app.use(pug('src/server/views'));
app.use(koaStatic('build'));
app.use(koaBody());
app.use(routes());
app.use(allowedMethods());

app.use((ctx) => {
    ctx.render('index');
});

console.log('listen:8080');

app.listen(8080);
