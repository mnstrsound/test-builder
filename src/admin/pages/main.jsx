import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
    Button
} from 'antd';

import { TestCardView}  from '../components/views/test-card-view';
import { EditTestInput}  from '../components/inputs/edit-test-input/edit-test-input';

const getStores = ({
   questionsStore,
   testsStore,
   routerStore
}) => ({ questionsStore, testsStore, routerStore });

@inject(getStores)
@observer
export default class Main extends Component {
    componentDidMount() {
        this.props.testsStore.getTests();
    }

    render() {
        const { testsStore } = this.props;
        return (
            <div style={ { margin: '0 auto', width: '1000px' } }>
                Главная
                <Button onClick={ this.handleAddButtonClick }>
                    Создать тест
                </Button>
                {/*<CreateTestInput*/}
                    {/*test={ testsStore.creatingTest }*/}
                    {/*onSubmit={ this.handleCreateTestSubmit }*/}
                {/*/>*/}
                { testsStore.tests.map(test => (
                    <TestCardView
                        key={ test.id }
                        test={ test }
                    />
                )) }
            </div>
        );
    }

    handleAddButtonClick = () => {
        this.props.routerStore.push('/admin/test');
    }

    handleCreateTestSubmit = () => {
        const { testsStore, routerStore } = this.props;
        testsStore
            .createTest()
            .then(({ id }) => {
                routerStore.push(`/admin/test/${id}`);
            });
    }
}
