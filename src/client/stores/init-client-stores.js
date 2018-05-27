import { ClientTestsStore } from './tests-store';
import { ClientUserStore } from './user-store';

const clientTestsStore = new ClientTestsStore();
const clientUserStore = new ClientUserStore();

export default () => ({
    clientTestsStore,
    clientUserStore
});
