import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";


export function TitleGuard(
    to:   RouteLocationNormalized,
    _:    RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    document.title =
        (to.meta.title as string) || "Atlas Demo | Account Dashboard";

    next();
}
