import { RouterStore } from 'mobx-react-router';
import { TestsStore } from './tests-store';
import { UsersStore } from './users-store';

const testsStore = new TestsStore();
const usersStore = new UsersStore();
const routerStore = new RouterStore();

export default () => ({
    testsStore,
    usersStore,
    routerStore
});
