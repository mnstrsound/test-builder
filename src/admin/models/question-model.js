import { observable, computed, action } from 'mobx';

import { AnswerModel } from './answer-model';

class QuestionModel {
    constructor(question = {}) {
        this.id = question.id;
        this.title = question.title || '';
        this.content = question.content || '';
        this.answers = question.answers
            ? question.answers.map(answer => new AnswerModel(answer))
            : [];
    }

    @observable title = '';
    @observable content = '';
    @observable answers = [];

    @action setTitle(title) {
        this.title = title;
    }

    @action setContent(content) {
        this.content = content;
    }

    @action addAnswer(content) {
        this.answers.push(new AnswerModel(content));
    }
}

export { QuestionModel };
