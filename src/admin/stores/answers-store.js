import { action, observable } from 'mobx';

// import { AnswerModel } from '../models/answer';

class QuestionsStore {
    @observable questions = [];

    @action addQuestion = () => {
        this.questions.push(new Question());
    }
}

export default QuestionsStore;
