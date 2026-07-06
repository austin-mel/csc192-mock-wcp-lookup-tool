import { describe, beforeEach, vi, expect, it } from "vitest";
import { RouteLocationNormalized } from "vue-router";
import { TitleGuard } from "./title.guard";


describe('TitleGuard', () => {
    let next: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        document.title = '';

        next = vi.fn();
    });


    it('should set document title from "to.meta.title" and call "next"', () => {
        const to = {
            meta: { title: 'Title' }
        } as unknown as RouteLocationNormalized;
        const from = {} as RouteLocationNormalized;

        TitleGuard(to, from, next);

        expect(document.title).toBe('Title');
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should fallback to default title when "to.meta.title" is missing and call next', () => {
        const to = {
            meta: {}
        } as unknown as RouteLocationNormalized;
        const from = {} as RouteLocationNormalized;

        TitleGuard(to, from, next);
        expect(document.title).toBe('Atlas Demo | Account Dashboard');
        expect(next).toHaveBeenCalledTimes(1);
    });
});
