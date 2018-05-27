import React, { Component } from 'react';
import { Button, Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import './nav.css';

const getStores = ({
   routerStore,
   clientUserStore
}) => ({
    routerStore,
    clientUserStore
});

@inject(getStores)
@observer
@cn('client-nav')
class ClientNav extends Component {
    render(cn) {
        return (
            <div
                className={ cn() }
            >
                <Menu
                    mode='horizontal'
                    selectedKeys={['/admin/user']}
                >
                    <Menu.Item key='/admin/user'>
                        <Icon type='user' />
                        { this.props.clientUserStore.fullName }
                    </Menu.Item>
                </Menu>
                <Button
                    type='primary'
                    icon='logout'
                    className={ cn('logout') }
                    onClick={ this.handleLogoutButtonClick }
                >
                    Выйти
                </Button>
            </div>
        );
    }

    handleMenuClick = (e) => {
        this.props.routerStore.history.push(e.key);
    }

    handleLogoutButtonClick = async () => {
        const { routerStore } = this.props;
        const token = await localStorage.removeItem('token');
        routerStore.history.push('/login');
    }
}

export { ClientNav };
