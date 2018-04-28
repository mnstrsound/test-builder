import Koa from 'koa';
import koaStatic from 'koa-static';
import koaBody from 'koa-body';
import pug from 'js-koa-pug';
import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import { JwtStrategy, ExtractJwt } from 'passport-jwt';

app.use(passport.initialize()); // сначала passport
import { routes, allowedMethods } from './routes';
import { initConnection } from './mongo';

initConnection();

const app = new Koa();
app.use(passport.initialize());
app.use(pug('src/server/views'));
app.use(koaStatic('build'));
app.use(koaBody());
app.use(routes());
app.use(allowedMethods());

app.use((ctx) => {
    ctx.render('index');
});

app.listen(8080);
