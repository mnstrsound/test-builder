import { action, observable } from 'mobx';

import Question from '../models/question-model';

class QuestionsStore {
    @observable questions = [];

    @action addQuestion = () => {
        this.questions.push(new Question());
    }
}

export { QuestionsStore };
