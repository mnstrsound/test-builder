import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';

import { EditTestInput}  from '../../components/inputs/edit-test-input';
import { EditQuestionInput}  from '../../components/inputs/edit-question-input';

import { TestModel } from '../../models/test-model';
import { QuestionModel } from '../../models/question-model';

const getStores = ({
   testsStore
}) => ({ testsStore });

@inject(getStores)
@observer
class EditPage extends Component {
    state = {
        creatingQuestion: new QuestionModel()
    }

    componentDidMount() {
        const { match: { params: { id } }, testsStore } = this.props;
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

    render() {
        const { test, creatingQuestion, isNew } = this.state;

        if (!test) return null;

        return (
            <div style={ { margin: '0 auto', width: '1000px' } }>
                Главная
                <EditTestInput
                    test={ test }
                />
                <EditQuestionInput
                    question={ creatingQuestion }
                    onSubmit={ this.handleCreateQuestionSubmit }
                />
                { test.questions.map(question => (
                    <EditQuestionInput
                        key={ question.title }
                        question={ question }
                        onSubmit={ this.handleCreateQuestionSubmit }
                    />
                )) }
                <Button onClick={ this.handleCreateTestSubmit }>
                    { isNew ? 'Сохранить' : 'Обновить' }
                </Button>
            </div>
        );
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

export { EditPage };
