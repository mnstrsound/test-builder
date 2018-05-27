import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'arui-feather/main.css';

import { App } from './admin/components/ui/app/app';
import { ClientApp } from './client/components/ui/app/app';
import Main from './admin/pages/main';
import { TestRootPage } from './admin/pages/test/root-page/root-page';
import { TestEditPage } from './admin/pages/test/edit-page/edit-page';
import { UserRootPage } from './admin/pages/user/root-page/root-page';
import { UserEditPage } from './admin/pages/user/edit-page/edit-page';
import { LoginPage } from './admin/pages/login/login-page';
import { UserPage } from './client/pages/user-page/user-page';
import { TestPage } from './client/pages/test-page/test-page';

import './custom.css';

const renderRoute = (props, Component) => (
    <App key={ props.location.pathname }>
        <Component { ...props } />
    </App>
);

const renderClientRoute = (props, Component) => (
    <ClientApp key={ props.location.pathname }>
        { console.log(props) }
        <Component { ...props } />
    </ClientApp>
);

const Root = ({ stores, history, basename }) => (
    <Provider { ...stores }>
        <Router history={ history } basename={ basename }>
            <Switch>
                <Route exact={ true } path='/admin/' render={ props => renderRoute(props, Main) } />
                <Route exact={ true } path='/admin/test' render={ props => renderRoute(props, TestRootPage) } />
                <Route exact={ true } path='/admin/test/edit' render={ props => renderRoute(props, TestEditPage) } />
                <Route exact={ true } path='/admin/test/edit/:id' render={ props => renderRoute(props, TestEditPage) } />
                <Route exact={ true } path='/admin/user' render={ props => renderRoute(props, UserRootPage) } />
                <Route exact={ true } path='/admin/user/edit' render={ props => renderRoute(props, UserEditPage) } />
                <Route exact={ true } path='/admin/user/edit/:id' render={ props => renderRoute(props, UserEditPage) } />
                <Route exact={ true } path='/login/' component={ LoginPage } />
                <Route exact={ true } path='/user/' render={ props => renderClientRoute(props, UserPage) } />
                <Route exact={ true } path='/test/:id' render={ props => renderClientRoute(props, TestPage) } />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
