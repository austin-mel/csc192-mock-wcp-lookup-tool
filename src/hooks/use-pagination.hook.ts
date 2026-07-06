import { computed, ref, Ref } from "vue";


export function usePagination<T>(items: Ref<T[]>, items_per_page: number = 10) {
    const current_page    = ref(1);
    const is_invalid_page = ref(false);

    const total_items = computed(() => items.value.length);
    const total_pages = computed(() => Math.ceil(total_items.value / items_per_page));

    const paginated_items = computed(() => {
        const start = (current_page.value - 1) * items_per_page;
        const end   = start + items_per_page;

        return items.value.slice(start, end);
    });

    function next_page() {
        if (current_page.value < total_pages.value) {
            current_page.value++;
            is_invalid_page.value = false;
        }
    }

    function prev_page() {
        if (current_page.value > 1) {
            current_page.value--;
            is_invalid_page.value = false;
        }
    }

    function update_page(new_page: number) {
        if (new_page < 1 || new_page > total_pages.value) {
            is_invalid_page.value = true;
            return;
        }

        is_invalid_page.value = false;
        current_page.value    = new_page;
    }

    return {
        current_page,
        total_items,
        total_pages,
        paginated_items,
        is_invalid_page,
        next_page,
        prev_page,
        update_page,
        items_per_page,
    }
}
