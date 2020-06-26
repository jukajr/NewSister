import { Http } from '../../../../providers';

export default {
    getProjects({ commit }) {
        commit('toggleLoading', true);

        return Http.request({
            url: 'projects',
        })
            .then(projects => commit('setProjects', projects))
            .finally(() => commit('toggleLoading', false));
    }
};
