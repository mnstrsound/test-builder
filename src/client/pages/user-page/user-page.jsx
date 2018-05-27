import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import { Table, Button, Modal } from 'antd';

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
@cn('client-user-page')
class UserPage extends Component {
    componentDidMount() {
        this.props.clientUserStore.getUser();
        this.props.clientTestsStore.getTests();
    }

    render(cn) {
        return (
            <Table
                dataSource={ this.props.clientTestsStore.tests }
                columns={ this.getColumns(cn) }
            />
        );
    }

    handleLinkClick = (id) => {
        this.props.history.push(`/test/${id}`);
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
                    title: 'Прогресс',
                    dataIndex: 'percentage',
                    key: 'percentage',
                    render: (text, record) => (
                        <span>{ text }</span>
                    )
                },
                {
                    title: 'Оценка',
                    key: 'mark',
                    render: (text, record) => (
                        <span>5</span>
                    )
                },
                {
                    title: 'Управление',
                    key: 'management',
                    render: (text, record) => (
                        <a onClick={ (e) => {
                            e.preventDefault();
                            this.handleLinkClick(record._id)
                        } }>Пройти тестирование</a>
                    )
                }
            ]
        )
    };
}

export { UserPage };
