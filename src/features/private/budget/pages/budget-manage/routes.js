const PageBudgetManage = () => import('./PageBudgetManage');

export default {
    name: 'budget-manage',
    path: ':id/manage/:account_id?',
    params: {
        id: null,
        account_id: null,
    },
    component: PageBudgetManage,
    meta: {
        title: 'Gerenciar o orçamento',
    },
};
