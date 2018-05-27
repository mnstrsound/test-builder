import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import './nav.css';

const getStores = ({ routerStore }) => ({ routerStore });

@inject(getStores)
@observer
@cn('nav')
class Nav extends Component {
    render(cn) {
        const re = /(\/\w+\/\w+)/;
        const current = this.props.routerStore.location.pathname.match(re)[0];

        return (
            <div
                className={ cn() }
            >
                <Menu
                    mode='horizontal'
                    selectedKeys={[current]}
                    onClick={this.handleMenuClick}
                >
                    <Menu.Item key='/admin/user'>
                        <Icon type='user' />
                        Пользователи
                    </Menu.Item>
                    <Menu.Item key='/admin/test'>
                        <Icon type='check-square-o' />
                        Тесты
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

export { Nav };
