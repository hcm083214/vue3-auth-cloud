export function createRoutes(routes: any) {
    return routes.map((route: any) => {
        if (route.children) {
            route.children = createRoutes(route.children);
        }
        return route;
    });
}