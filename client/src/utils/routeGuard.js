const FALLBACK_ROUTE = 'login';

// Prevents navigation to protected routes
function beforeRouteEnterHandler(to, from, next, store) {
    const checkStoreForAuth = (store) => store.getters.isLoggedIn;
        if (checkStoreForAuth(store)) {
            console.info('RouteGuard', {from, to}, 'permitted');
            next();
        } else {
            console.info('RouteGuard', {from, to}, 'blocked');
            next(FALLBACK_ROUTE);
        }
}

module.exports = { beforeRouteEnterHandler };