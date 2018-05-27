import Router from 'koa-router';

import { testRoutes } from './test-routes';
import { userRoutes } from './user-routes';
import { loginRoutes } from './login-routes';

const router = new Router();

testRoutes(router);
userRoutes(router);
loginRoutes(router);

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
