const form = () => import('./form');

export default {
    name: 'crud-form',
    path: 'form/:id?',
    params: {
        id: null,
    },
    component: form,
    meta: {
        title: 'FORM',
    },
};
