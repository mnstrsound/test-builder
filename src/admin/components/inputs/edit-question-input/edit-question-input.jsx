import React, { Component } from 'react';
import {
    Card,
    Input,
    Button
} from 'antd';
import cn from 'arui-feather/cn';

import { observer } from 'mobx-react';

import { AnswerInput } from '../answer-input/answer-input';
import { InputErrorView } from '../../views/input-error-view/input-error-view';

import './edit-question-input.css';

const { TextArea } = Input;

@observer
@cn('edit-question-input')
class EditQuestionInput extends Component {
    state = {
        questionAnswer: ''
    }

    render(cn) {
        const { question, isNew } = this.props;
        return (
            <Card
                title={ isNew ? 'Добавить новый вопрос' : 'Редактировать вопрос' }
                className={ cn() }
            >
                <InputErrorView error={ question.titleError } />
                { this.renderTitleInput(cn) }
                <InputErrorView error={ question.contentError } />
                { this.renderContentInput(cn) }
                { this.renderAnswers(cn) }
                { this.renderAddAnswerInput(cn) }
                { isNew && this.renderSubmitQuestionButton(cn) }
            </Card>
        );
    }

    renderTitleInput(cn) {
        return (
            <Input
                placeholder='Заголовок'
                value={ this.props.question.title }
                onChange={ this.handleTitleInputChange }
                className={ cn('title-input') }
            />
        );
    }

    renderContentInput(cn) {
        return (
            <TextArea
                placeholder='Содержание'
                value={ this.props.question.content }
                onChange={ this.handleContentInputChange }
                className={ cn('content-input') }
            />
        );
    }

    renderAnswers(cn) {
        return this.props.question.answers.map((answer, index) => (
            <AnswerInput
                key={ index }
                answer={ answer }
                className={ cn('answer-input') }
            />
        ));
    }

    renderAddAnswerInput(cn) {
        return (
            <Input
                placeholder='Введите ответ'
                value={ this.state.questionAnswer }
                onChange={ this.handleAnswerChange }
                className={ cn('add-answer-input') }
                addonAfter={ this.renderAddAnswerButton() }
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

    renderSubmitQuestionButton(cn) {
        return (
            <Button
                onClick={ this.handleSubmitQuestionButtonClick }
                className={ cn('submit-question-button') }
                disabled={ !this.props.question.valid }
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
