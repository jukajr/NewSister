const PageBudgetDetail = () => import('./PageBudgetDetail');

export default {
    name: 'budget-detail',
    path: 'detail/:id',
    params: {
        id: null,
    },
    component: PageBudgetDetail,
    meta: {
        title: 'Orçamento Detalhe',
    },
};
