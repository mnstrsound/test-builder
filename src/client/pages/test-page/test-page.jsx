import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import { Table, Button, Modal, Checkbox, Card } from 'antd';

const getStores = ({
       clientUserStore,
       clientTestsStore
   }) =>
({
    clientUserStore,
    clientTestsStore
});

@inject(getStores)
@observer
@cn('client-test-page')
class TestPage extends Component {
    state = { answers: [] }

    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.clientTestsStore.getTest(id);
        this.props.clientUserStore.getUser();
    }

    render(cn) {
        const { clientTestsStore: { currentTest } } = this.props;
        return (
            <Card
                title={ currentTest.title  }
            >
                <p>{ currentTest.description }</p>
                { currentTest.questions && currentTest.questions.map((question, index) => (
                    <div key={ question._id }>
                        <h2>Вопросы:</h2>
                        <h3>{ question.title }</h3>
                        { question.answers.map(answer => (
                            <Checkbox
                                key={ answer._id }
                                value={ answer.content }
                                onChange={ this.handleCheckboxChange(index) }
                            >
                                { answer.content }
                            </Checkbox>
                        )) }
                    </div>
                )) }
                <Button
                    onClick={ this.handleSaveButtonClick }
                >
                    Отправить ответ
                </Button>
            </Card>
        );
    }

    handleCheckboxChange = (index) => {
        return ({ target: { value } }) => {
            const stateAnswers = this.state.answers;
            const currentAnswers = stateAnswers[index];
            if (currentAnswers) {
                const index = currentAnswers.indexOf(value);
                if (index !== -1) {
                    currentAnswers.splice(index, 1);
                } else {
                    currentAnswers.push(value)
                }
            } else {
                stateAnswers[index] = [value];
            }

            this.setState({ answers: stateAnswers });
        }
    }

    handleSaveButtonClick = () => {
        const { match: { params: { id: testId } }, clientUserStore } = this.props;
        const { answers } = this.state;
        clientUserStore.saveTest({ testId, answers });
    }
}

export { TestPage };
