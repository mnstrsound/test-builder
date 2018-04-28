import React, { Component } from 'react';
import {
    Card,
    Input,
    Button
} from 'antd';

import { observer } from 'mobx-react';

const { TextArea } = Input;

import { AnswerInput } from './answer-input';

@observer
class EditQuestionInput extends Component {
    state = {
        questionAnswer: ''
    }

    render() {
        return (
            <Card title='Добавить новый вопрос'>
                { this.renderTitleInput() }
                { this.renderContentInput() }
                { this.renderAnswers() }
                { this.renderAddAnswerInput() }
                { this.renderAddAnswerButton() }
                { this.renderSubmitQuestionButton() }
            </Card>
        );
    }

    renderTitleInput() {
        return (
            <Input
                placeholder='Заголовок'
                value={ this.props.question.title }
                onChange={ this.handleTitleInputChange }
            />
        );
    }

    renderContentInput() {
        return (
            <TextArea
                placeholder='Содержание'
                value={ this.props.question.content }
                onChange={ this.handleContentInputChange }
            />
        );
    }

    renderAnswers() {
        return this.props.question.answers.map((answer, index) => (
            <AnswerInput
                key={ index }
                answer={ answer }
            />
        ));
    }

    renderAddAnswerInput() {
        return (
            <Input
                placeholder='Введите ответ'
                value={ this.state.questionAnswer }
                onChange={ this.handleAnswerChange }
            />
        );
    }

    renderAddAnswerButton() {
        return (
            <Button
                disabled={ this.shouldDisableAddAnswerButton() }
                onClick={ this.handleAddAnswerSubmit }
            >
                Добавить
            </Button>
        );
    }

    renderSubmitQuestionButton() {
        return (
            <Button
                onClick={ this.handleSubmitQuestionButtonClick }
            >
                Добавить
            </Button>
        )
    }

    handleTitleInputChange = ({ target: { value } }) => {
        this.props.question.setTitle(value);
    }

    handleContentInputChange = ({ target: { value } }) => {
        this.props.question.setContent(value);
    }

    handleAddAnswerSubmit = () => {
        this.props.question.addAnswer({
            content: this.state.questionAnswer
        });
        this.setState({ questionAnswer: '' });
    }

    handleAnswerChange = ({ target: { value: questionAnswer } }) => {
        this.setState({ questionAnswer });
    }

    handleSubmitQuestionButtonClick = () => {
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
    }

    shouldDisableAddAnswerButton() {
        const { question } = this.props;
        const { questionAnswer } = this.state;
        return !questionAnswer || question.answers.find(({ content }) => content === questionAnswer);
    }
}

export { EditQuestionInput };
