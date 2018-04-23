import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
    Button
} from 'antd';

import { EditTestInput}  from '../components/inputs/edit-test';
import { EditQuestionInput}  from '../components/inputs/edit-question';
import { QuestionCardView}  from '../components/views/question-card';

const getStores = ({
   questionsStore,
   testsStore
}) => ({ questionsStore, testsStore });

@inject(getStores)
@observer
export default class Test extends Component {
    componentDidMount() {
        const { testsStore, match: { params: { id } } } = this.props;

        testsStore
            .getTests()
            .then(() => {
                const test = testsStore.tests.find(test => test.id == id);
                test.getFullInfo();
            });
    }

    render() {
        const { testsStore, match: { params: { id } } } = this.props;
        const test = testsStore.tests.find(test => test.id == id);

        if (!test) return null;
        console.log(test.questions);
        return (
            <div style={ { margin: '0 auto', width: '1000px' } }>
                Главная
                <EditTestInput
                    test={ test }
                    // onSubmit={ this.handleCreateTestSubmit }
                />
                <EditQuestionInput
                    question={ test.creatingQuestion }
                    onSubmit={ this.handleCreateQuestionSubmit }
                />
                { test.questions.map(question => (
                    <QuestionCardView
                        key={ question.id }
                        question={ question }
                    />
                )) }
            </div>
        );
    }

    handleCreateTestSubmit = () => {
        this.props.testsStore
            .createTest();
    }

    handleCreateQuestionSubmit = () => {
        const { testsStore, match: { params: { id } } } = this.props;
        const test = testsStore.tests.find(test => test.id == id);
        test.addQuestion();
    }
}
