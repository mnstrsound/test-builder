import { observable, computed, action } from 'mobx';
import randomstring from 'randomstring';

import { AnswerModel } from './answer-model';

class QuestionModel {
    constructor(question = {}) {
        this.id = question._id || randomstring.generate(7);
        this.title = question.title || '';
        this.content = question.content || '';
        this.answers = question.answers
            ? question.answers.map(answer => new AnswerModel(answer, this))
            : [];
    }

    @observable title = '';
    @observable content = '';
    @observable answers = [];

    @action setTitle(title) {
        this.title = title;
    }

    @computed get titleError() {
        return !this.title.length
            ? 'Введите заголовок'
            : '';
    }

    @action setContent(content) {
        this.content = content;
    }

    @computed get contentError() {
        return !this.content.length
            ? 'Введите описание'
            : '';
    }

    @action addAnswer(content) {
        this.answers.push(new AnswerModel(content, this));
    }

    @action removeAnswer(answer) {
        const index = this.answers.indexOf(answer);
        if (index !== -1) {
            this.answers.splice(index, 1);
        }
    }

    @computed get valid() {
        return this.title
        && this.content
        && this.answers.every((answer) => answer.valid);
    }
}

export { QuestionModel };
