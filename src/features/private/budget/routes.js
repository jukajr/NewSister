import * as children from './pages/**/routes.js'; //eslint-disable-line
// const PageBudgetDetail = () => import('./PageBudgetDetail');
const PageBudget = () => import('./PageBudget');

export default {
    path: 'budget',
    children: {
        budget: {
            path: ':id',
            params: {
                id: null,
            },
            name: 'budget',
            component: PageBudget,
            meta: {
                title: 'Orçamento',
            },
        },
        ...children,
    },
};
