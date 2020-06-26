import Vue from 'vue';
import Vuex from 'vuex';
import { Store } from './providers';
import * as privateFeaturesStores from './features/private/**/store/index.js'; //eslint-disable-line
import * as publicFeaturesStores from './features/public/**/store/index.js'; //eslint-disable-line
Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: Store.convert({
        ...privateFeaturesStores,
        ...publicFeaturesStores,
    }),
});
