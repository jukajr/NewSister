export default class Route {
    static convert(routes) {
        const listRoutes = routes || {};

        return Object.keys(listRoutes)
            .map(key => listRoutes[key])
            .filter(route => route)
            .map(route => this.children(route));
    }

    static children(route) {
        const { component, children } = route;

        if (!component) {
            Object.assign(route, {
                component: {
                    template: '<router-view></router-view>',
                },
            });
        }

        if (children && typeof children === 'object') {
            Object.assign(route, {
                children: this.convert(children),
            });
        }

        return route;
    }
}
