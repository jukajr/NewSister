import VueRouter from 'vue-router';
import {
    Auth,
    Route,
    Dom,
    EventBus,
} from './providers';
import * as privateFeatures from './features/private/*/routes.js'; //eslint-disable-line
import * as publicFeatures from './features/public/**/routes.js'; //eslint-disable-line
import PageHome from './features/private/home/PageHome';

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        ...Route.convert(publicFeatures),
        {
            path: '/',
            name: 'home',
            component: PageHome,
            children: Route.convert({
                ...privateFeatures,
            }),
            meta: {
                requiresAuth: true,
            },
            redirect: {
                name: 'projects',
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = Dom.formatPageTitle(to);

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuth = Auth.isAuth();

    if (requiresAuth && !isAuth) {
        return next({
            name: 'login',
            query: { redirect: to.fullPath },
        });
    }

    if (isAuth && to.name === 'login') {
        return next({ name: 'projects' });
    }

    return next();
});

EventBus.$on('routerPush', (event) => {
    const { name = null, query = {} } = event;

    if (name === 'login') {
        Object.assign(event, {
            query: {
                ...query || {},
                redirect: router.history.current.fullPath,
            },
        });
    }

    router.push(event);
});

export default router;
