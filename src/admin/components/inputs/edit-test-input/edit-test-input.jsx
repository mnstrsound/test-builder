import React, { Component } from 'react';
import { Input, Card } from 'antd';
import { observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import { InputErrorView } from '../../views/input-error-view/input-error-view';

import './edit-test-input.css';

@observer
@cn('edit-test-input')
class EditTestInput extends Component {
    render(cn) {
        const { test } = this.props;

        return (
            <Card
                title='Основные параметры'
                className={ cn() }
            >
                <InputErrorView error={ test.titleError } />
                <Input
                    value={ test.title }
                    placeholder='Введите заголовок'
                    className={ cn('title-input') }
                    onChange={ this.handleTitleInputChange }
                />
                <InputErrorView error={ test.descriptionError } />
                <Input
                    value={ test.description }
                    placeholder='Введите описание'
                    className={ cn('description-input') }
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

