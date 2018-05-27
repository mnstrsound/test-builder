import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'arui-feather/cn';
import { Table, Button, Modal } from 'antd';

import { UserService } from '../../../../services/user-service';

import './root-page.css';

const confirm = Modal.confirm;

const getStores = ({
    usersStore
}) => ({
    usersStore
});

@inject(getStores)
@observer
@cn('user-root-page')
class UserRootPage extends Component {
    componentDidMount() {
        const { usersStore } = this.props;
        usersStore
            .getUsers();
    }

    render(cn) {
        const { usersStore } = this.props;

        return (
            <div className={ cn() }>
                <Button
                    type='primary'
                    icon='plus'
                    size='large'
                    className={ cn('create-button') }
                    onClick={ this.handleCreateButtonClick }
                >
                    Создать нового пользователя
                </Button>
                <Table
                    dataSource={ usersStore.users }
                    columns={ this.getColumns(cn) }
                />
            </div>
        );
    }

    renderDeleteConfirm(id) {
        const { usersStore } = this.props;
        confirm({
            title: 'Удаление пользователя',
            content: 'Вы действительно хотите удалить данного пользователя?',
            cancelText: 'Отмена',
            async onOk() {
                await UserService.delete(id);
                await usersStore.getUsers();
            },
            onCancel() {},
        });
    }

    handleTestCardViewClick = (id) => {
        this.props.history.push(`/admin/user/edit/${id}`);
    }

    handleCreateButtonClick = () => {
        this.props.history.push('/admin/user/edit');

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
                    title: 'Имя',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => (
                        <span>{ text }</span>
                    )
                },
                {
                    title: 'Фамилия',
                    dataIndex: 'surname',
                    key: 'surname',
                    render: (text) => (
                        <span>{ text }</span>
                    )
                },
                {
                    title: 'Отчество',
                    dataIndex: 'patronymic',
                    key: 'patronymic',
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

export { UserRootPage };
