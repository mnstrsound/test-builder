import React, { Component } from 'react';
import { Checkbox, Input } from 'antd';
import { observer } from 'mobx-react';

@observer
class AnswerInput extends Component {
    render() {
        const { answer: { isCorrect, content } } = this.props;
        return (
            <div>
                <Checkbox
                    checked={ isCorrect }
                    onChange={ this.handleCheckboxChange }
                />
                <Input
                    value={ content }
                    onChange={ this.handleInputChange }
                />
            </div>
        );
    }

    handleCheckboxChange = () => {
        this.props.answer.toggleCorrect();
    }

    handleInputChange = ({ target: { value } }) => {
        this.props.answer.setContent(value);
    }
}

export { AnswerInput };
