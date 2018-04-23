import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'arui-feather/main.css';

import Main from './admin/pages/main.jsx';
import { EditPage } from './admin/pages/test/edit-page.jsx';

const Root = ({ stores, history, basename }) => (
    <Provider { ...stores }>
        <Router history={ history } basename={ basename }>
            <Switch>
                <Route exact={ true } path='/admin/' component={ Main } />
                <Route exact={ true } path='/admin/test' component={ EditPage } />
                <Route exact={ true } path='/admin/test/:id' component={ EditPage } />
            </Switch>
        </Router>
    </Provider>
);

export default Root;
