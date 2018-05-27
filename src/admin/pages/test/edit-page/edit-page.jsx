import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import cn from 'arui-feather/cn';

import { EditTestInput }  from '../../../components/inputs/edit-test-input/edit-test-input';
import { EditQuestionInput}  from '../../../components/inputs/edit-question-input/edit-question-input';
import { SelectUsersInputObserver }  from '../../../components/inputs/select-users-input';

import { TestModel } from '../../../models/test-model';
import { QuestionModel } from '../../../models/question-model';

import './edit-page.css';

const getStores = ({
    testsStore,
    usersStore
}) => ({
    testsStore,
    usersStore
});

@inject(getStores)
@observer
@cn('test-edit-page')
class TestEditPage extends Component {
    state = {
        creatingQuestion: new QuestionModel()
    }

    componentDidMount() {
        const { match: { params: { id } }, testsStore, usersStore } = this.props;
        usersStore.getUsers();
        if (id) {
            testsStore
                .getTests()
                .then(() => {
                    this.setState({
                        test: testsStore.tests.find(({ _id }) => _id === id),
                        isNew: false
                    });
                })
        } else {
            this.setState({
                test: new TestModel(),
                isNew: true
            });
        }
    }

    render(cn) {
        const { test, creatingQuestion, isNew } = this.state;

        if (!test) return null;

        return (
            <div style={ { margin: '0 auto', width: '1000px' } }>
                <EditTestInput
                    test={ test }
                    className={ cn('edit-test-input') }
                />
                { test.questions.map(question => (
                    <EditQuestionInput
                        key={ question._id }
                        question={ question }
                        onSubmit={ this.handleCreateQuestionSubmit }
                        className={ cn('edit-question-input') }
                    />
                )) }
                <EditQuestionInput
                    isNew={ true }
                    question={ creatingQuestion }
                    onSubmit={ this.handleCreateQuestionSubmit }
                    className={ cn('edit-question-input') }
                />
                <SelectUsersInputObserver
                    users={ this.props.usersStore.users }
                    selectedUsersIds = { this.state.test.usersIds }
                    onUserChange={ this.handleSelectUsersItemChange }
                    className={ cn('select-users-input') }
                />
                <Button
                    disabled={ !test.valid }
                    onClick={ this.handleCreateTestSubmit }
                >
                    { isNew ? 'Сохранить' : 'Обновить' }
                </Button>
            </div>
        );
    }

    handleSelectUsersItemChange = (id) => {
        const { test } = this.state;
        test.toggleUserId(id);
    }

    handleCreateTestSubmit = () => {
        const { test, isNew } = this.state;
        isNew ? test.save() : test.update();
    }

    handleCreateQuestionSubmit = () => {
        const { test, creatingQuestion } = this.state;
        test.addQuestion(creatingQuestion);
        this.setState({ creatingQuestion: new QuestionModel() });
    }
}

export { TestEditPage };
