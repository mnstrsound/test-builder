import { Question } from '../models';
import { routeBuilder } from './route-builder';

const questionRoutes = router => routeBuilder(router, 'question', Question);

export { questionRoutes };
