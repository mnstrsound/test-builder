import { Answer } from '../models';
import { routeBuilder } from './route-builder';

const answerRoutes = router => routeBuilder(router, 'answer', Answer);

export { answerRoutes };
