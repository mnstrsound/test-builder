import React, { Component } from 'react';
import { Input, Card } from 'antd';
import { observer } from 'mobx-react';

@observer
class EditTestInput extends Component {
    render() {
        const { test } = this.props;
        return (
            <Card title='Основные параметры'>
                <Input
                    value={ test.title }
                    placeholder='Введите заголовок'
                    onChange={ this.handleTitleInputChange }
                />
                <Input
                    value={ test.description }
                    placeholder='Введите Описание'
                    onChange={ this.handleDescriptionInputChange }
                />
            </Card>
        );
    }

    handleTitleInputChange = ({ target: { value: title } }) => {
        this.props.test.setTitle(title);
    }

    handleDescriptionInputChange = ({ target: { value: description } }) => {
        this.props.test.setDescription(description);
    }
}

export { EditTestInput }

