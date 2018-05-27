import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import cn from 'arui-feather/cn';

import { EditUserInput}  from '../../../components/inputs/edit-user-input/edit-user-input';
import { UserModel } from '../../../models/user-model';

import './edit-page.css';

const getStores = ({
   usersStore
}) => ({ usersStore });

@inject(getStores)
@observer
@cn('user-edit-page')
class UserEditPage extends Component {
    state = {}

    componentDidMount() {
        const { match: { params: { id } }, usersStore } = this.props;
        usersStore.getUsers();

        if (id) {
            usersStore
                .getUsers()
                .then(() => {
                    this.setState({
                        user: usersStore.users.find(({ _id }) => _id === id),
                        isNew: false
                    });
                })
        } else {
            this.setState({
                user: new UserModel(),
                isNew: true
            });
        }
    }

    render(cn) {
        const { user, isNew } = this.state;
        if (!user) return null;

        return (
            <div>
                <EditUserInput
                    user={ user }
                />
                <Button
                    onClick={ this.handleCreateTestSubmit }
                    className={ cn('button') }
                >
                    { isNew ? 'Сохранить' : 'Обновить' }
                </Button>
            </div>
        );
    }

    handleCreateTestSubmit = () => {
        const { user, isNew } = this.state;
        isNew ? user.save() : user.update();
        this.props.history.push('/admin/user')
    }

    handleCreateQuestionSubmit = () => {
        // const { user, creatingQuestion } = this.state;
        // user.addQuestion(creatingQuestion);
    }
}

export { UserEditPage };
