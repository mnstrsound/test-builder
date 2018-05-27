import React, { Component } from 'react';
import cn from 'arui-feather/cn';

import { LoginForm } from '../../components/forms/login-form/login-form';
import { LoginFormModel } from '../../models/login-form-model';

import './login-page.css';

@cn('login-page')
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.loginForm = new LoginFormModel();
    }

    render(cn) {
        return (
            <div className={ cn() }>
                <LoginForm
                    className={ cn('form') }
                    loginForm={ this.loginForm }
                    onSubmit={ this.handleLoginFormSubmit }
                />
            </div>
        );
    }

    handleLoginFormSubmit = async () => {
        const { data: { token } } = await this.loginForm.login();

        if (!token) alert('ойойойой!');

        await localStorage.setItem('token', token);

        this.props.history.push('/user');
    }
}

export { LoginPage };
