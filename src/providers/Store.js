export default class Store {
    static convert(stores) {
        const listStores = stores || {};

        return Object.keys(listStores)
            .map(key => listStores[key])
            .filter(store => store.name)
            .map(store => this.modules(store))
            .reduce((itemA, itemB) => ({
                ...itemA,
                ...itemB,
            }), []);
    }

    static modules(store) {
        const { name, modules, ...newStore } = store;

        if (modules && typeof modules === 'object' && Object.keys(modules).length > 0) {
            const newModules = this.convert(modules);

            if (newModules && !Array.isArray(newModules)) {
                Object.assign(newStore, {
                    modules: newModules,
                });
            }
        }

        return {
            [name]: newStore,
        };
    }
}
