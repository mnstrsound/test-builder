import React, { Component } from 'react';
import cn from 'arui-feather/cn';

import { Nav } from '../nav/nav';

import './app.css';

@cn('app')
class App extends Component {
    render(cn) {
        return (
            <div className={ cn() }>
                <Nav />
                { this.props.children }
            </div>
        );
    }
}

export { App };
