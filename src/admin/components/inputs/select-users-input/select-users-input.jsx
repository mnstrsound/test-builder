import React, { Component } from 'react';
import {
    Card,
    Checkbox
} from 'antd';

import { observer } from 'mobx-react';

import cn from 'arui-feather/cn';

// import './edit-user-input.css';

@observer
@cn('select-users-input')
class SelectUsersInput extends Component {
    render(cn) {
        const { users, selectedUsersIds } = this.props;
        return (
            <Card
                title='Назначить пользователям'
                className={ cn() }
            >
                {  users.map(user => (
                    <div key={ user._id } >
                        <Checkbox
                            value={ user._id }
                            checked={ selectedUsersIds.includes(user._id) }
                            onChange={ this.handleUserChange }
                        >
                            { user.surname } { user.name }
                        </Checkbox>
                    </div>
                )) }

            </Card>
        );
    }

    handleUserChange = ({ target: { value } }) => {
        const { onUserChange } = this.props;
        onUserChange && onUserChange(value);
    }
}

export { SelectUsersInput };
