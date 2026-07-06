import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useLocaleStore } from "./locale.store";
import { createPinia, setActivePinia } from "pinia";


let Navigator = { ...navigator };
let I18n      = { ...Intl };      // Intl(Internalization)


describe('useLocaleStore', () => {
    let store: ReturnType<typeof useLocaleStore>;

    class LocaleMock { region = 'de' };

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useLocaleStore();
    });

    afterAll(() => {
        Object.defineProperty(global, 'navigator', { value: Navigator });
        Object.defineProperty(global, 'Intl',      { value: I18n      });
    });

    describe('init() method', () => {
        it('should read navigator.language and update state via Intl.Locale', () => {
            vi.stubGlobal('navigator', { ...Navigator, language: 'de-DE'    });
            vi.stubGlobal('Intl',      { ...I18n,      Locale:   LocaleMock });
    
            store.init();
            expect(store.locale).toBe('de-DE');
            expect(store.country_code).toBe('DE');
        });
    
        it('should fallback to default and split when Intl.Locale is missing', () => {
            vi.stubGlobal('navigator', { ...Navigator, language: 'it-IT'   });
            vi.stubGlobal('Intl',      { ...I18n,      Locale:   undefined });

            store.init();
            expect(store.locale).toBe('it-IT');
            expect(store.country_code).toBe('IT');
        });

        it('should use "en-US" default value when navigator.language and Intl.Locale are undefined', () => {
            vi.stubGlobal('navigator', { ...Navigator, language: undefined });
            vi.stubGlobal('Intl',      { ...I18n,      Locale:   undefined });

            store.init();
            expect(store.locale).toBe('en-US');
            expect(store.country_code).toBe('US');
        });
    });

    describe('derive_country() getter', () => {
        it('should use Intl.Locale when available', () => {
            vi.stubGlobal('Intl', { ...I18n, Locale: LocaleMock });
            store.$patch({ locale: 'en-GB' });

            expect(store.derive_country).toBe('DE');
        });

        it('should fallback to default and split when Intl.Locale is missing', () => {
            vi.stubGlobal('Intl', { I18n, Locale: undefined });
            store.$patch({ locale: 'ru-RU' });
            
            expect(store.derive_country).toBe('RU');
        });

        it('should handle underscore as a separator', () => {
            vi.stubGlobal('Intl', { I18n, Locale: undefined });
            store.$patch({ locale: 'uk_UA' });
            
            expect(store.derive_country).toBe('UA');
        });

        it('should use "US" when navigator.language and Intl.Locale are undefined', () => {
            vi.stubGlobal('navigator', { Navigator, Locale: undefined });
            vi.stubGlobal('Intl',      { I18n,      Locale: undefined });
            store.$patch({ locale: 'es' });
            
            expect(store.derive_country).toBe('US');
        });
    });
});
