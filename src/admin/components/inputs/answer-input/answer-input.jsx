import React, { Component } from 'react';
import { Checkbox, Input, Icon } from 'antd';
import { observer } from 'mobx-react';
import cn from 'arui-feather/cn';

import { InputErrorView } from '../../views/input-error-view/input-error-view';

import './answer-input.css';

@observer
@cn('answer-input')
class AnswerInput extends Component {
    render(cn) {
        const { answer: { isCorrect, content, contentError } } = this.props;
        return (
            <div className={ cn() }>
                <InputErrorView error={ contentError } />
                <Icon
                    type='close'
                    onClick={ this.handleIconClick }
                    className={ cn('remove-icon') }
                />
                <Input
                    value={ content }
                    onChange={ this.handleInputChange }
                    className={ cn('content-input') }
                />
                <Checkbox
                    checked={ isCorrect }
                    onChange={ this.handleCheckboxChange }
                    className={ cn('is-correct-input') }
                >
                    является ответом
                </Checkbox>
            </div>
        );
    }

    handleIconClick = () => {
        this.props.answer.remove();
    }

    handleCheckboxChange = () => {
        this.props.answer.toggleCorrect();
    }

    handleInputChange = ({ target: { value } }) => {
        this.props.answer.setContent(value);
    }
}

export { AnswerInput };
