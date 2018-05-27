import { action, observable } from 'mobx';

import { UserModel } from '../models/user-model';
import { UserService } from '../../services/user-service';

class UsersStore {
    @observable users = [];

    @action getUsers() {
        return UserService
            .findAll()
            .then(({ data }) => {
                this.users = data.map(user => new UserModel(user));
            });
    }
}

export { UsersStore };
