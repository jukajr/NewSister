import { Http } from '../../../../providers';

export default {
    getBudget({ commit }, id) {//eslint-disable-line
        commit('toggleLoading', true);

        return Http.request({
            // url: `budget/${id}`,
            url: 'budget',
        })
            .then(item => commit('setItem', item))
            .finally(() => commit('toggleLoading', false));
    },
    getParentAccounts({ commit }) {
        return Http.request({
            url: 'parentAccounts',
        })
            .then(accounts => commit('setAccounts', accounts));
    },
    getBudgetAccount(budget_id, account_id) {//eslint-disable-line
        return Http.request({
            url: 'budget/item',
            // url: `budget/${budget_id}/account/${account_id}`,
        });
    },
    updateBudgetAccount(body) {
        // const {
        //     id: account_id,
        // } = body;
        return Http.request({
            // url: `budget/${budget_id}/account/${account_id}`,
            url: 'budget/item',
            method: 'PUT',
            body,
        });
    },
    createBudgetAccount(body) {
        // const {
        //     budget_id,
        // } = body;
        return Http.request({
            // url: `budget/${budget_id}`,
            url: 'budget',
            method: 'POST',
            body,
        });
    },
    deleteBudgetAccount(budget_id, id) {//eslint-disable-line
        return Http.request({
            // url: `budget/${budget_id}/account/${id}`,
            url: 'budget/item',
            method: 'DELETE',
        });
    },
};
