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
        this.usersIds = data.usersIds || [];
    }

    @observable title = '';
    @observable description = '';
    @observable questions = [];
    @observable usersIds = [];

    @action setTitle(title) {
        this.title = title;
    }

    @computed get titleError() {
        return !this.title.length
            ? 'Введите заголовок'
            : ''
    }

    @action setDescription(description) {
        this.description = description;
    }

    @computed get descriptionError() {
        return !this.description.length
            ? 'Введите описание'
            : ''
    }

    @action addQuestion(question) {
        return this.questions.push(question)
    }

    @action toggleUserId(id) {
        const index = this.usersIds.indexOf(id);
        if (index !== -1) {
            this.usersIds.splice(index, 1);
        } else {
            this.usersIds.push(id);
        }
    }

    @computed get valid() {
        return this.title
            && this.description
            && this.questions.every((question) => question.valid);
    }

    getTestData() {
        const { questions, ...data } = this;
        const questionsToSave = questions.map(({ answers, ...question }) => {
            const answersToSave = answers.map(({ question, ...answer }) => answer);
            return {
                ...question,
                answers: answersToSave
            }
        });

        return { ...data, questions: questionsToSave };
    }

    @action save() {
        return TestService.create(this.getTestData());
    }

    @action update() {
        return TestService.update(this._id, this.getTestData());
    }
}

export { TestModel };
