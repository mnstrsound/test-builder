import Router from 'koa-router';
// import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
// import { schema } from './data/schema';
import { testRoutes } from './test-route';
// import { questionRoutes } from './question';
// import { answerRoutes } from './answer';

const router = new Router();

testRoutes(router);
// questionRoutes(router);
// answerRoutes(router);

// router.post('/graphql', graphqlKoa({ schema }));
// router.get('/graphql', graphqlKoa({ schema }));
//
// router.get(
//     '/graphiql',
//     graphiqlKoa({
//         endpointURL: '/graphql' // a POST endpoint that GraphiQL will make the actual requests to
//     }),
// );

export function routes() { return router.routes(); }
export function allowedMethods() { return router.allowedMethods(); }
