export default class Storage {
    static get prefix() {
        return 'ls.';
    }

    static getStorage(storage) {
        const storages = {
            local: window.localStorage,
            session: window.sessionStorage,
        };
        const origin = storages.local.getItem('ls.persistData', 'local') || 'session';

        return storages[storage || origin];
    }

    static set(key, value, storage) {
        const newValue =
            value instanceof Array ||
            value instanceof Object ? JSON.stringify(value) : value;
        return this.getStorage(storage).setItem(this.prefix + key, newValue);
    }

    static get(key, storage) {
        const value = this.getStorage(storage).getItem(this.prefix + key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

    static remove(key, storage) {
        return this.getStorage(storage).removeItem(this.prefix + key);
    }

    static clear(storage) {
        return this.getStorage(storage).clear();
    }
}
