import { beforeEach, describe, expect, it, vi } from "vitest";
import { useJwt } from "@vueuse/integrations/useJwt";
import { createPinia, setActivePinia } from "pinia";

import { useAuthStore } from "./auth.store";
import { AuthService } from "@/services";
import { AuthDTO } from "@/types";
import { router, Routes } from '@/router';


// Mocks
vi.mock('@/services', () => ({
    AuthService: { Login: vi.fn() },
}));

vi.mock('@vueuse/integrations/useJwt', () => ({
    useJwt: vi.fn(),
}));

vi.mock('@/router', () => ({
    router: { push: vi.fn() },
    Routes: { LOGIN: 'Login', DASHBOARD: 'Dashboard' },
}));

const ClaimsMock: Partial<AuthDTO.JwtClaims> = {
    sub: '1',
    first_name: 'Jordan',
    last_name: 'Rivera',
    exp: Math.floor(Date.now() / 1000) + 500
}


// Tests
describe('useAuthStore', () => {
    let store: ReturnType<typeof useAuthStore>;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        
        setActivePinia(createPinia());
        store = useAuthStore();
    });

    describe('"is_authenticated" getter', () => {
        it('should update "is_authenticated" when token is present', () => {
            expect(store.is_authenticated).toBe(false);
    
            store.token = 'token';
            expect(store.is_authenticated).toBe(true);
    
            store.token = '';
            expect(store.is_authenticated).toBe(false);
        });
    });

    describe('"login" action', () => {
        it('should have empty token and not set state when no token received from api', async () => {
            (AuthService.Login as any).mockResolvedValue({ token: '' });
            
            const result = await store.login({ email: 'demo.manager@example.com', password: 'portfolio-demo' });
            expect(result).toBe('');
            expect(store.token).toBe('');
            expect(localStorage.getItem('portfolio_demo_session')).toBeNull();
        });

        it('should set "token", "user_info" and update "localStorage" on valid token', async () => {
            (AuthService.Login as any).mockResolvedValue({ token: 'token' });
            (useJwt as any).mockReturnValue({ payload: { value: ClaimsMock } });

            const token = await store.login({ email: 'demo.manager@example.com', password: 'portfolio-demo' });
            expect(token).toBe('token');
            expect(store.token).toBe('token');
            expect(store.user_info).toEqual({ ...ClaimsMock });
            expect(localStorage.getItem('portfolio_demo_session')).toBe('token');
        });
    });

    describe('"logout" action', () => {
        it('should clear "token", "user_info" and update "localStorage" and navigate to login', () => {
            store.token     = 'token';
            store.user_info = { sub: '123', exp: 0 } as any;
            expect(store.token).toBe('token');
            expect(store.user_info).not.toBeNull();

            store.logout();

            expect(store.token).toBe('');
            expect(store.user_info).toBeNull();
            expect(localStorage.getItem('portfolio_demo_session')).toBeNull();
            expect(router.push).toBeCalledWith({ name: Routes.LOGIN });
        });
    });

    describe('"auto_login" action', () => {
        it('should log out and return false when no "token" in state', () => {
            store.token = '';

            const result = store.auto_login();
            expect(result).toBe(false);
            expect(router.push).toHaveBeenCalled();
        });

        it('should log out and return false when payload is invalid', () => {
            store.token = 'token';
            (useJwt as any).mockReturnValue({ payload: { value: null } });

            const result = store.auto_login();
            expect(result).toBe(false);
            expect(router.push).toHaveBeenCalled();
        });

        it('should log out and return false when token is expired', () => {
            store.token = 'token';
            const jwt = {
                exp: Math.floor(Date.now() / 1000) - 500,
            };
            (useJwt as any).mockReturnValue({ payload: { value: jwt } });

            const result = store.auto_login();
            expect(result).toBe(false);
            expect(store.user_info).toBeNull();
            expect(router.push).toHaveBeenCalled();
        });

        it('should log out and return false when token is expired', () => {
            store.token = 'token';
            (useJwt as any).mockReturnValue({ payload: { value: ClaimsMock } });

            const result = store.auto_login();
            expect(result).toBe(true);
            expect(store.user_info).toEqual(ClaimsMock);
        });
    })
});
