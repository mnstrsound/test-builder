import React, { Component } from 'react';
import { Card } from 'antd';


class TestCardView extends Component {
    render() {
        const { test } = this.props;
        return (
            <Card title={ test.title }>
                { test.description }
            </Card>
        );
    }
}

export { TestCardView };
