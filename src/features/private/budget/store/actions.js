import { Http } from '../../../../providers';

export default {
    getProjectById({ commit }, id) {
        commit('toggleLoading', true);
        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `project/${id}`,
            method: 'GET',
        }).finally(() => commit('toggleLoading', false));
    },
    getBudgets({ commit }, id) {//eslint-disable-line
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `budget/${id}`,
        })
            .finally(() => commit('toggleLoading', false));
    },
    getVersions({ commit }, id) {
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `budgetdraftversion/${id}`,
        })
            .finally(() => commit('toggleLoading', false));
    },
    getBudgetdraft({ commit }, { id, version }) {
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `budgetdraft/${id}/${version}`,
        })
            .finally(() => commit('toggleLoading', false));
    },
    getBudgetdraftheader({ commit }, { id, version }) {
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `budgetdraftheader/${id}/${version}`,
        })
            .finally(() => commit('toggleLoading', false));
    }
};
