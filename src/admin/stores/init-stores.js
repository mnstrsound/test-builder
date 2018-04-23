import { RouterStore } from 'mobx-react-router'
import { TestsStore } from './tests-store';
import { QuestionsStore } from './questions-store';

const testsStore = new TestsStore();
const questionsStore = new QuestionsStore();
const routerStore = new RouterStore();

export default () => ({
    questionsStore,
    testsStore,
    routerStore
});
