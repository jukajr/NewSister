const form = () => import('./form');

export default {
    name: 'project-form',
    path: 'form/:id?',
    params: {
        id: null,
    },
    component: form,
    meta: {
        title: 'Projeto',
    },
};
