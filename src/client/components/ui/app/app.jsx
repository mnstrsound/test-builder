import React, { Component } from 'react';
import cn from 'arui-feather/cn';

import { ClientNav } from '../nav/nav';

import './app.css';

@cn('client-app')
class ClientApp extends Component {
    render(cn) {
        return (
            <div className={ cn() }>
                <ClientNav />
                { this.props.children }
            </div>
        );
    }
}

export { ClientApp };
