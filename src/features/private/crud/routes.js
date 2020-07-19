import * as children from './pages/routes.js'; //eslint-disable-line
// const PageBudgetDetail = () => import('./PageBudgetDetail');
const PageIndex = () => import('./PageIndex');

export default {
    path: 'crud',
    children: {
        crud: {
            path: '',
            name: 'crud',
            component: PageIndex,
            meta: {
                title: 'INDEX',
            },
        },
        ...children,
    },
};
