import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';
import { Table, Button, Modal } from 'antd';

import { TestService } from '../../../../services/test-service';

import './root-page.css';

const confirm = Modal.confirm;

const getStores = ({
    testsStore
}) => ({
    testsStore
});

@inject(getStores)
@observer
@cn('test-root-page')
class TestRootPage extends Component {
    componentDidMount() {
        const { testsStore } = this.props;
        testsStore
            .getTests();
    }

    render(cn) {
        const { testsStore } = this.props;

        return (
            <div className={ cn() }>
                <Button
                    type='primary'
                    icon='plus'
                    size='large'
                    className={ cn('create-button') }
                    onClick={ this.handleCreateButtonClick }
                >
                    Создать новый тест
                </Button>
                <Table
                    dataSource={ testsStore.tests }
                    columns={ this.getColumns(cn) }
                />
            </div>
        );
    }

    renderDeleteConfirm(id) {
        const { testsStore } = this.props;
        confirm({
            title: 'Удаление теста',
            content: 'Вы действительно хотите удалить данный тест?',
            cancelText: 'Отмена',
            async onOk() {
                await TestService.delete(id);
                await testsStore.getTests();
            },
            onCancel() {},
        });
    }

    handleTestCardViewClick = (id) => {
        this.props.history.push(`/admin/test/edit/${id}`);
    }

    handleCreateButtonClick = () => {
        this.props.history.push('/admin/test/edit');

    }

    getColumns(cn) {
        return (
            [
                {
                    title: '№',
                    key: 'number',
                    render: (text, test, index) => (
                        <span>{ ++index }</span>
                    )
                },
                {
                    title: 'Заголовок',
                    dataIndex: 'title',
                    key: 'title',
                    render: (text) => (
                        <span>{ text }</span>
                    )
                },
                {
                    title: 'Управление',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <Button
                                type='primary'
                                shape='circle'
                                icon='edit'
                                size='medium'
                                className={ cn('action-button') }
                                onClick={ () => this.handleTestCardViewClick(record._id) }
                            />
                            <Button
                                type='primary'
                                shape='circle'
                                icon='delete'
                                size='medium'
                                className={ cn('action-button') }
                                onClick={ () => this.renderDeleteConfirm(record._id) }
                            />
                        </span>
                    )
                }
            ]
        )
    };
}

export { TestRootPage };
