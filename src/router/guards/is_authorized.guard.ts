import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

import { useAuthStore } from "@/stores";
import { Routes } from "..";


export function IsAuthorizedGuard(
    to:   RouteLocationNormalized,
    _:    RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    const store = useAuthStore();

    if ( !store.user_info && store.token && !store.auto_login() ) {
        return next({ name: Routes.LOGIN });
    }

    const requires_guest = !!to.meta.requires_guest;
    const requires_auth  = !!to.meta.requires_auth

    if (requires_auth && !store.is_authenticated) {
        return next({ name: Routes.LOGIN })
    }

    if (requires_guest && store.is_authenticated) {
        return next({ name: Routes.DASHBOARD });
    }

    return next();
}
