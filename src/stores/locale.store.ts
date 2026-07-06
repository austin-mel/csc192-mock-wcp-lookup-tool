import { CountryCode } from "libphonenumber-js";
import { defineStore } from "pinia";


export interface LocaleState {
    country_code: CountryCode;
    locale:       string;
}


export const useLocaleStore = defineStore("locale", {
    state: (): LocaleState => ({
        country_code: 'US',
        locale:       navigator.language ?? 'en-US',
    }),

    getters: {
        derive_country(state): CountryCode {
            if (typeof Intl.Locale === 'function') {
                const region = new Intl.Locale(state.locale).region;
                return region?.toUpperCase() as CountryCode || "US";
            }

            const [_, region = 'US'] = state.locale.split(/[-_]/);
            return region.toUpperCase() as CountryCode || 'US';
        }
    },

    actions: {
        init(): void {
            this.locale       = navigator.language ?? 'en-US';
            this.country_code = this.derive_country;
        },
    },
});
