import Storage from './Storage';

export default class Auth {
    static get storageKey() {
        return 'user';
    }

    static get storageMenuKey() {
        return 'menu';
    }

    static getUser() {
        return Storage.get(this.storageKey) || {};
    }

    static updateUser(userData) {
        return Storage.set(this.storageKey, Object.assign({}, this.getUser(), userData));
    }

    static getToken() {
        const user = this.getUser();
        return user.token ? user.token : null;
    }

    static isAuth() {
        return !!this.getToken();
    }

    static logout() {
        Storage.clear();
        return null;
    }
}
