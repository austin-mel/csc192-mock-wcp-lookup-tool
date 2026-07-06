import { ref, nextTick } from 'vue';
import { test, beforeEach, expect, describe } from 'vitest'
import { usePagination } from './use-pagination.hook';


describe("usePagination.hook", () => {
    let items = ref<number[]>([]);


    beforeEach(() => {
        items = ref(Array.from({ length: 25 }, (_, index) => index + 1));
    });


    test("initial values and computed properties", () => {
        const items_per_page = 10;
        const {
            current_page,
            total_items,
            total_pages,
            paginated_items,
            is_invalid_page
        } = usePagination(items, items_per_page);

        expect(current_page.value).toBe(1);
        expect(total_items.value).toBe(25);
        expect(total_pages.value).toBe(3);
        expect(paginated_items.value).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(is_invalid_page.value).toBe(false);
    });


    test("'next_page' method increments the current page", async () => {
        const items_per_page = 10;
        const {
            current_page,
            total_pages,
            paginated_items,
            next_page,
        } = usePagination(items, items_per_page);

        next_page();
        await nextTick();
        expect(current_page.value).toBe(2);
        expect(paginated_items.value).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        next_page();
        await nextTick();
        expect(current_page.value).toBe(3);
        expect(paginated_items.value).toEqual([21, 22, 23, 24, 25]);

        next_page();
        await nextTick();
        expect(current_page.value).toBe(total_pages.value);
    });


    test("'prev_page' method decrement the current page", async () => {
        const items_per_page = 10;
        const {
            current_page,
            paginated_items,
            next_page,
            prev_page,
        } = usePagination(items, items_per_page);

        next_page();
        next_page();
        await nextTick();
        expect(current_page.value).toBe(3);
        expect(paginated_items.value).toEqual([21, 22, 23, 24, 25]);

        prev_page();
        await nextTick();
        expect(current_page.value).toBe(2);
        expect(paginated_items.value).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        prev_page();
        await nextTick();
        expect(current_page.value).toBe(1);
        expect(paginated_items.value).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        prev_page();
        await nextTick();
        expect(current_page.value).toBe(1);
    });


    test("'update_page' method updates the page when valid", async () => {
        const items_per_page = 10;
        const {
            current_page,
            paginated_items,
            update_page,
            is_invalid_page,
        } = usePagination(items, items_per_page);

        update_page(3);
        await nextTick();
        expect(current_page.value).toBe(3);
        expect(is_invalid_page.value).toBe(false);
        expect(paginated_items.value).toEqual([21, 22, 23, 24, 25]);

        update_page(2);
        await nextTick();
        expect(current_page.value).toBe(2);
        expect(is_invalid_page.value).toBe(false);
        expect(paginated_items.value).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });


    test("'update_page' method flags invalid page numbers", async () => {
        const items_per_page = 10;
        const {
            current_page,
            update_page,
            is_invalid_page
        } = usePagination(items, items_per_page);

        update_page(0);
        await nextTick();
        expect(is_invalid_page.value).toBe(true);
        expect(current_page.value).toBe(1);

        update_page(5);
        await nextTick();
        expect(is_invalid_page.value).toBe(true);
        expect(current_page.value).toBe(1);
    });
})