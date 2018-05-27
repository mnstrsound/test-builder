import React, { Component } from 'react';
import cn from 'arui-feather/cn';

import './input-error-view.css';

@cn('input-error-view')
class InputErrorView extends Component {
    render(cn) {
        const { error } = this.props;
        return (
            <span className={ cn() }>
                { error }
            </span>
        );
    }
}

export { InputErrorView };
