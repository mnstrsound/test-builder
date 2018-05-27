import React, { Component } from 'react';

class TestCardView extends Component {
    render() {
        const { test } = this.props;
        return (
            <a onClick={ this.handleClick }>
                { test.title }
            </a>
        );
    }

    handleClick = (e) => {
        e.preventDefault();
        const { onClick, test: { _id } } = this.props;
        onClick && onClick(_id);
    }
}

export { TestCardView };
