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
    },
    getInternalCompany({ commit }) {
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: 'internalcompany',
        })
        .finally(() => commit('toggleLoading', false));
    },
    getProjectById({ commit }, id) {
        commit('toggleLoading', true);
        console.log(`project/${id}`);
        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `project/${id}`,
            method: 'GET',
        }).finally(() => commit('toggleLoading', false));
    },
    setProject({ commit }, form) {
        commit('toggleLoading', true);
        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: `project`,
            method: `${ form.project_group_id ? 'PUT' : 'POST' }`,
            data: form,
        }).finally(() => commit('toggleLoading', false));
    },
};
