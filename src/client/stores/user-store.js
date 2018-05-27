import { action, observable, computed } from 'mobx';
import axios from 'axios';

import { getAuthHeader } from '../../utils/get-auth-header';

class UserStore {
    @observable user = {};

    @action async getUser() {
        return axios
                .get('/api/user/current', { headers: await getAuthHeader() })
                .then(({ data }) => {
                    this.user = data.user;
                });
    }

    @action async saveTest(data) {
        return axios
                .post('/api/user/test', data, { headers: await getAuthHeader() })
    }

    @computed get fullName() {
        return `${this.user.surname} ${this.user.name} ${this.user.patronymic}`;
    }
}

export { UserStore as ClientUserStore };
