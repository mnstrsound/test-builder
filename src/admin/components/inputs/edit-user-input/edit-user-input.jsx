import React, { Component } from 'react';
import {
    Card,
    Input,
    Button
} from 'antd';

import { observer } from 'mobx-react';

import cn from 'arui-feather/cn';

import { InputErrorView } from '../../views/input-error-view/input-error-view';

import './edit-user-input.css';

@observer
@cn('edit-user-input')
class EditUserInput extends Component {
    render(cn) {
        const { user } = this.props;

        return (
            <Card
                title='Редактировать пользователя'
                className={ cn() }
            >
                <InputErrorView error={ user.nameError } />
                { this.renderNаmeInput(cn) }
                <InputErrorView error={ user.surnameError } />
                { this.renderSurnameInput(cn) }
                <InputErrorView error={ user.patronymicError } />
                { this.renderPatronymicInput(cn) }
                <InputErrorView error={ user.emailError } />
                { this.renderEmailInput(cn) }
            </Card>
        );
    }

    renderNаmeInput(cn) {
        return (
            <Input
                placeholder='Имя'
                value={ this.props.user.name }
                onChange={ this.handleNameInputChange }
                className={ cn('input') }
            />
        );
    }

    renderSurnameInput(cn) {
        return (
            <Input
                placeholder='Фамилия'
                value={ this.props.user.surname }
                onChange={ this.handleSurnameInputChange }
                className={ cn('input') }
            />
        );
    }

    renderPatronymicInput(cn) {
        return (
            <Input
                placeholder='Отчество'
                value={ this.props.user.patronymic }
                onChange={ this.handlePatronymicInputChange }
                className={ cn('input') }
            />
        );
    }

    renderEmailInput(cn) {
        return (
            <Input
                placeholder='E-mail'
                value={ this.props.user.email }
                onChange={ this.handleEmailInputChange }
                className={ cn('input') }
            />
        );
    }

    handleNameInputChange = ({ target: { value } }) => {
        this.props.user.setName(value);
    }

    handleSurnameInputChange = ({ target: { value } }) => {
        this.props.user.setSurname(value);
    }

    handlePatronymicInputChange = ({ target: { value } }) => {
        this.props.user.setPatronymic(value);
    }

    handleEmailInputChange = ({ target: { value } }) => {
        this.props.user.setEmail(value);
    }
}

export { EditUserInput };
