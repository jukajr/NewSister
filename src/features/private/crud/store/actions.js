import { Http } from '../../../../providers';

export default {
    getProjects({ commit }) {
        commit('toggleLoading', true);

        return Http.request({
            url: 'projects',
        })
            .then(projects => commit('setProjects', projects))
            .finally(() => commit('toggleLoading', false));
    },
    getProjects2({ commit }) {
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: 'projectstages',
        })
            .then(projects => commit('setProjects2', projects))
            .finally(() => commit('toggleLoading', false));
    }
};
