import * as children from './pages/routes.js'; //eslint-disable-line
// const PageBudgetDetail = () => import('./PageBudgetDetail');
const PageIndex = () => import('./PageIndex');

export default {
    path: 'stage',
    children: {
        stage: {
            path: '',
            name: 'stage',
            component: PageIndex,
            meta: {
                title: 'Etapa',
            },
        },
        ...children,
    },
};
