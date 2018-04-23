import { observable, computed, action } from 'mobx';
import { TestService } from '../../services/test-service';
import { QuestionModel } from './question-model';

class TestModel {
    constructor(data = {}) {
        this._id = data._id;
        this.title = data.title || '';
        this.description = data.description || '';
        this.questions = data.questions
            ? data.questions.map(question => new QuestionModel(question))
            : [];
    }

    @observable title = '';
    @observable description = '';
    @observable questions = [];

    @action setTitle(title) {
        this.title = title;
    }

    @action setDescription(description) {
        this.description = description;
    }

    @action addQuestion(question) {
        return this.questions.push(question)
    }

    @action save() {
        return TestService.create(this);
    }

    @action update() {
        return TestService.update(this._id, this);
    }
}

export { TestModel };
