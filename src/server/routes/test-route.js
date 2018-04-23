import { TestModel } from '../models/test-model';
import { routeBuilder } from './route-builder';

const testRoutes = router => routeBuilder(router, 'test', TestModel);

export { testRoutes };
