import React, { Component } from 'react';
import { Card, Menu, Dropdown, Icon } from 'antd';

class QuestionCardView extends Component {
    render() {
        const { question } = this.props;
        return (
            <Card
                title={ question.title }
                extra={ this.renderExtra() }
            >
                { question.content }
                <ul>
                    { question.answers.map(({ id, content }) => (
                        <li key={ id }>{ content }</li>
                    )) }
                </ul>
            </Card>
        );
    }

    renderExtra() {
        return (
            <Dropdown overlay={ this.renderMenu() }>
                <div>
                    Управление <Icon type='down' />
                </div>
            </Dropdown>
        );
    }

    renderMenu() {
        return (
            <Menu>
                <Menu.Item key={ 1 }>
                    Редактировать
                </Menu.Item>
                <Menu.Item key={ 2 }>
                    Удалить
                </Menu.Item>
            </Menu>
        );
    }
}

export { QuestionCardView };
