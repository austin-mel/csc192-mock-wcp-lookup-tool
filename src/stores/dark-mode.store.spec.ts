import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDarkModeStore } from "./dark-mode.store";
import { createPinia, setActivePinia } from "pinia";


describe('useDarkModeStore', () => {
    let store: ReturnType<typeof useDarkModeStore>;

    const MatchMediaMock = vi.fn<(query: string) => MediaQueryList>().
        mockImplementation((query) => ({
            matches:             false, // 'prefers-color-scheme' value
            media:               query,
            onchange:            null,
            addListener:         vi.fn(),
            removeListener:      vi.fn(),
            addEventListener:    vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent:       vi.fn(() => false),
        }));

    beforeEach(() => {
        vi.stubGlobal('matchMedia', MatchMediaMock );

        setActivePinia(createPinia());
        store = useDarkModeStore();

        localStorage.clear();
        document.documentElement.classList.remove('dark');
    });


    describe('init()', () => {
        it('should read "true" from localStorage and sets dark mode', () => {
            localStorage.setItem('dark-mode', 'true');
            store.init();

            expect(store.is_dark_mode).toBe(true);
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(localStorage.getItem('dark-mode')).toBe('true');
        });

        it('should read "false" from localStorage and sets dark mode', () => {
            localStorage.setItem('dark-mode', 'false');
            store.init();

            expect(store.is_dark_mode).toBe(false);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(localStorage.getItem('dark-mode')).toBe('false');
        });

        it('should fallback to matchMedia when no value is in localStorage', () => {
            store.init();

            expect(store.is_dark_mode).toBe(false);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(localStorage.getItem('dark-mode')).toBe('false');
        });
    });

    describe('toggle_dark_mode()', () => {
        it('should toggle from "false" to "true" and persist', () => {
            store.is_dark_mode = false;
            store.toggle_dark_mode();

            expect(store.is_dark_mode).toBe(true);
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(localStorage.getItem('dark-mode')).toBe('true');
        });
        
        it('should toggle from "true" to "false" and persist', () => {
            store.is_dark_mode = true;
            store.toggle_dark_mode();

            expect(store.is_dark_mode).toBe(false);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(localStorage.getItem('dark-mode')).toBe('false');
        });
    });

    describe('apply_dark_mode()', () => {
        it('should add class and write "true" to local storage for dark-mode', () => {
            store.is_dark_mode = true;
            store.apply_dark_mode();

            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(localStorage.getItem('dark-mode')).toBe('true')
        });
        
        it('should remove class and write "false" to local storage for dark-mode', () => {
            store.is_dark_mode = false;
            store.apply_dark_mode();

            expect(document.documentElement.classList.contains('dark')).toBe(false);
            expect(localStorage.getItem('dark-mode')).toBe('false');
        });
    });
});
