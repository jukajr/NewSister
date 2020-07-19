export default {
    toggleLoading(state, loading) {
        state.loading = loading;
    },
    setItem(state, item) {
        state.item = item;
    },
    setAccounts(state, accounts) {
        state.accounts = accounts;
    },
    setBudgets(state, budgets) {
        state.budgets = budgets;
    },
};
