import { observable, computed, action } from 'mobx';
import axios from 'axios';

class LoginFormModel {
    @observable email = '';
    @observable password = '';

    @action setEmail(email) {
        this.email = email;
    }

    @action setPassword(password) {
        this.password = password;
    }

    @action async login() {
        return await axios.post('/api/login', this);
    }
}

export { LoginFormModel };
