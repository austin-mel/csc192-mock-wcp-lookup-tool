import { RouteRecordRaw } from "vue-router";
import {
    AccountView,
    DashboardView,
    LoginView,
    NotFoundView,
} from "@/views";
import { Routes } from "./allowed-routes";


export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: Routes.LOGIN,
        component: LoginView,
        meta: {
            title:          "Atlas Demo | Sign In",
            requires_guest: true
        },
    },
    {
        path: "/dashboard",
        name: Routes.DASHBOARD,
        component: DashboardView,
        meta: {
            title:        "Atlas Demo | Dashboard",
            requires_auth: true
        },
    },
    {
        path: "/account",
        name: Routes.ACCOUNT,
        component: AccountView,
        meta: {
            title:       "Atlas Demo | Profile",
            require_auth: true
        },
    },
    {
        path: "/:pathMatch(.*)*",
        name: Routes.NOT_FOUND,
        component: NotFoundView,
    },
];
