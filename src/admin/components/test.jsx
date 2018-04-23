import React, { Component } from 'react';
import { Input, Card, Button } from 'antd';
import { observer } from 'mobx-react';

import { AnswerService } from '../../services/answer-service';
import { EditQuestionInput } from './inputs/edit-question';
import { SearchQuestion } from './inputs/search-question';
import { TestModel } from '../models/test-model';
import { QuestionModel } from '../models/question-model';

@observer
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.test = new TestModel();
        this.question = new QuestionModel();
    }

    componentDidMount() {
        AnswerService.findAll();
    }

    render() {
        const { questionsStore } = this.props;
        const { questions } = questionsStore;
        return (
            <div>
                <Card>
                    <Input
                        value={ this.test.title }
                        placeholder='Введите заголовок'
                        onChange={ this.handleTitleInputChange }
                    />
                    <Input
                        value={ this.test.description }
                        placeholder='Введите Описание'
                        onChange={ this.handleDescriptionInputChange }
                    />
                    <Button
                        type='primary'
                        onClick={ this.handleAddButtonClick }
                    >
                        Добавить
                    </Button>
                </Card>
                <SearchQuestion />
                <Button>
                    Создать вопрос
                </Button>
                <EditQuestionInput question={ this.question } />
            </div>
        );
    }

    handleTitleInputChange = ({ target: { value: title } }) => {
        this.test.setTitle(title);
    }

    handleDescriptionInputChange = ({ target: { value: description } }) => {
        this.test.setDescription(description);
    }

    handleAddButtonClick = () => {
        this.test.save();
    }

    handleAddQuestionButtonClick = () => {
        this.test.addQuestion();
    }
}

