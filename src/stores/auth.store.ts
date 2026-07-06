import { defineStore } from "pinia";
import { useJwt } from "@vueuse/integrations/useJwt";

import { router, Routes } from "@/router";
import { AuthService } from "@/services";
import { AuthDTO } from "@/types";
import { DEMO_SESSION_KEY } from "@/data/demo-data";


interface AuthStore {
    token:      string;
    user_info: AuthDTO.JwtClaims | null
}


export const useAuthStore = defineStore('auth', {
    state: (): AuthStore => ({
        token:     localStorage.getItem(DEMO_SESSION_KEY) || '',
        user_info: null,
    }),

    getters: {
        is_authenticated: state => !!state.token,
        is_logged_in: state => !!state.user_info,
    },

    actions: {
        async login(dto: AuthDTO.LoginRequest) {
            const { token } = await AuthService.Login(dto);

            if ( !token ) {
                return '';
            }

            this.token = token;
            localStorage.setItem(DEMO_SESSION_KEY, token);

            const { payload } = useJwt<AuthDTO.JwtClaims>(token);

            this.user_info = payload.value;

            return token;
        },

        logout() {
            this.token     = '';
            this.user_info = null;
            localStorage.removeItem(DEMO_SESSION_KEY);
            router.push({ name: Routes.LOGIN });
        },

        auto_login() {
            if ( !this.token ) {
                this.logout();
                return false;
            }

            const { payload } = useJwt<AuthDTO.JwtClaims>(this.token);

            if ( !payload.value || payload.value.exp * 1000 < Date.now() ) {
                this.logout();
                return false;
            }

            this.user_info = payload.value;
            return true;
        }
    }
});
