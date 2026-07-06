import { createPinia } from "pinia";

export * from "./locale.store";
export * from "./dark-mode.store";
export * from './auth.store'

export const pinia = createPinia();
