<template>
    <div
        class="flex flex-wrap items-center gap-1 border-t bg-white px-4 py-3 lg:flex-nowrap lg:px-6 dark:border-gray-700 dark:bg-gray-800"
    >
        <button
            type="button"
            class="order-1 flex-1 basis-0 rounded-md border border-gray-300 bg-white p-1 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 lg:px-4 lg:py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            @click="prev_page"
            :disabled="current_page === 1 || is_loading"
        >
            Previous
        </button>

        <button
            type="button"
            class="order-2 flex-1 basis-0 rounded-md border border-gray-300 bg-white p-1 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 lg:order-3 lg:px-4 lg:py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            @click="next_page"
            :disabled="current_page === total_pages || is_loading"
        >
            Next
        </button>

        <div
            v-if="!is_loading"
            class="order-2 mt-2 w-full text-center lg:order-2 lg:mt-0 lg:w-auto lg:px-4"
        >
            <p
                v-if="filtered.length > 0"
                class="text-sm text-gray-700 dark:text-gray-300"
                id="pagenumber"
            >
                Showing
                {{ " " }}
                <span class="font-medium">{{ start_index }}</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">{{ end_index }}</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">{{ total_items }}</span>
                {{ " " }}
                results
            </p>
            <p v-else class="text-sm text-gray-700 dark:text-gray-300">
                No Results
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCustomers } from "./Customers.provider";
import { computed } from "vue";

const {
    filtered,
    prev_page,
    next_page,
    total_pages,
    is_loading,
    total_items,
    current_page,
    items_per_page,
} = useCustomers();

const start_index = computed(
    () => (current_page.value - 1) * items_per_page + 1,
);

const end_index = computed(() => {
    const end = current_page.value * items_per_page;

    if (end > total_items.value) {
        return total_items.value;
    }

    return end;
});
</script>
