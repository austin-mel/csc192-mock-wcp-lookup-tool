import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./application-routes";
import { IsAuthorizedGuard, TitleGuard } from "./guards";


const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach(TitleGuard);
router.beforeEach(IsAuthorizedGuard);

export { router };
