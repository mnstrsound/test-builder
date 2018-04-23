import { observable, computed, action } from 'mobx';

class AnswerModel {
    constructor(answer) {
        this.id = answer.id || null;
        this.content = answer.content || '';
        this.isCorrect = answer.isCorrect || false;
    }

    @observable content = '';
    @observable isCorrect = false;

    @action setContent(content) {
        this.content = content;
    }

    @action toggleCorrect() {
        this.isCorrect = !this.isCorrect;
    }
}

export { AnswerModel };
