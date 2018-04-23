import { action, observable } from 'mobx';

import { TestModel } from '../models/test-model';
import { TestService } from '../../services/test-service';

class TestsStore {
    @observable tests = [];
    @observable creatingTest = new TestModel();

    @action getTests() {
        return TestService
            .findAll()
            .then(({ data }) => {
                this.tests = data.map(test => new TestModel(test));
            });
    }

    @action createTest() {
        return this.creatingTest
            .save()
            .then(({ data }) => {
                this.tests.push(new TestModel(data));
                this.creatingTest.setTitle('');
                this.creatingTest.setDescription('');
                return data;
            })
    }
}

export { TestsStore };
