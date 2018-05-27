import { observable, computed, action } from 'mobx';
import { UserService } from '../../services/user-service';

class UserModel {
    constructor(data = {}) {
        this._id = data._id;
        this.name = data.name;
        this.surname = data.surname;
        this.patronymic = data.patronymic;
        this.email = data.email;
    }

    @observable name = '';
    @observable surname = '';
    @observable patronymic = '';
    @observable email = '';

    @action setName(name) {
        this.name = name;
    }

    @computed get nameError() {
        return !this.name
            ? 'Введите имя'
            : '';
    }

    @action setSurname(surname) {
        this.surname = surname;
    }

    @computed get surnameError() {
        return !this.surname
            ? 'Введите фамилию'
            : '';
    }

    @action setPatronymic(patronymic) {
        this.patronymic = patronymic;
    }

    @computed get patronymicError() {
        return !this.patronymic
            ? 'Введите отчество'
            : '';
    }

    @action setEmail(email) {
        this.email = email;
    }

    @computed get emailError() {
        return !this.email
            ? 'Введите E-mail'
            : '';
    }

    @computed get isValid() {
        return this.name && this.surname && this.patronymic && this.email;
    }

    @action save() {
        return UserService.create(this);
    }

    @action update() {
        return UserService.update(this._id, this);
    }
}

export { UserModel };
