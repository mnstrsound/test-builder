import { observer } from 'mobx-react';
import {
    Form,
    Icon,
    Input,
    Button
} from 'antd';

import cn from 'arui-feather/cn';

import './login-form.css';

const FormItem = Form.Item;

@observer
@cn('login-form')
class LoginForm extends React.Component {

    render(cn) {
        const { loginForm } = this.props;
        return (
            <Form
                className={ cn() }
                onSubmit={this.handleSubmit}
            >
                <FormItem>
                    <Input
                        value={ loginForm.email }
                        prefix={ <Icon type='mail' style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        placeholder='Введите e-mail'
                        onChange={ this.handleEmailInputChange }
                    />
                </FormItem>
                <FormItem>
                    <Input
                        value={ loginForm.password }
                        prefix={ <Icon type='lock' style={ { color: 'rgba(0,0,0,.25)' } } /> }
                        type='password'
                        placeholder='Введите пароль'
                        onChange={ this.handlePasswordInputChange }
                    />
                </FormItem>
                <FormItem>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        Войти
                    </Button>
                </FormItem>
            </Form>
        );
    }

    handleEmailInputChange = ({ target: { value } }) => {
        const { loginForm } = this.props;
        loginForm.setEmail(value);
    }

    handlePasswordInputChange = ({ target: { value } }) => {
        const { loginForm } = this.props;
        loginForm.setPassword(value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit && onSubmit();
    }
}

export { LoginForm };
