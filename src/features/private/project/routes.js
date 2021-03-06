import * as children from './pages/routes.js'; //eslint-disable-line
// const PageBudgetDetail = () => import('./PageBudgetDetail');
const PageProject = () => import('./PageProject');

export default {
    path: 'projects',
    children: {
        projects: {
            path: '',
            name: 'projects',
            component: PageProject,
            meta: {
                title: 'Projetos',
            },
        },
        ...children,
    },
};
