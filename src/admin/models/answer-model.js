import { observable, computed, action } from 'mobx';
import randomstring from 'randomstring';

class AnswerModel {
    constructor(answer, question) {
        this.id = question._id || randomstring.generate(7);
        this.question = question;
        this.content = answer.content || '';
        this.isCorrect = answer.isCorrect || false;
    }

    @observable content = '';
    @observable isCorrect = false;
e
    @action setContent(content) {
        this.content = content;
    }

    @computed get contentError() {
        return !this.content.length
            ? 'Введите ответ или удалите'
            : '';
    }

    @action toggleCorrect() {
        this.isCorrect = !this.isCorrect;
    }

    @action remove() {
        return this.question.removeAnswer(this);
    }

    @computed get valid() {
        return this.content;
    }
}

export { AnswerModel };
