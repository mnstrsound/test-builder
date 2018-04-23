import { observable, computed, action } from 'mobx';
import { QuestionService } from '../../services/question-service';

class SearchQuestionModel {
    @observable value = '';
    @observable questions = [];

    @action setValue(value) {
        this.value = value;
    }

    @action getQuestions() {
        const { value } = this;
        QuestionService.findLike({ title: value });
    }
}

export { SearchQuestionModel };
