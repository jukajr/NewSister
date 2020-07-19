import { Http } from '../../../../providers';

export default {
    getItens({ commit }) {
        commit('toggleLoading', true);

        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: 'stage',
        })
            .then(itens => commit('setItens', itens))
            .finally(() => commit('toggleLoading', false));
    },
    getAnswerable() {
        return Http.request({
            baseURL: 'http://52.146.43.37:5000',
            url: 'answerable',
        });
    },
};
