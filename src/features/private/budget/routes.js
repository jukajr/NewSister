import * as children from './pages/**/routes.js'; //eslint-disable-line
const PageBudget = () => import('./PageBudget');

export default {
    path: 'budget',
    children: {
        budget: {
            path: ':id',
            name: 'budget',
            component: PageBudget,
            meta: {
                title: 'Orçamento',
            },
        },
        ...children,
    },
};
