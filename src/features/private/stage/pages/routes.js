const form = () => import('./form');

export default {
    name: 'stage-form',
    path: 'form/:id?',
    params: {
        id: null,
    },
    component: form,
    meta: {
        title: 'FORM',
    },
};
