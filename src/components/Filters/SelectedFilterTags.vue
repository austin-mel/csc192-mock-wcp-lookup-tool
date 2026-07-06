<template>
    <div v-if="selectedFilterTags.length" class="flex flex-wrap gap-2 mt-4">
        <div
            v-for="([filterName, filterOption], index) in selectedFilterTags"
            :key="index"
            class="flex items-center space-x-2 dark:bg-blue-500 bg-blue-200 border border-gray-400 text-sm px-2 py-1 rounded inline-flex items-center justify-center"
        >
            <span class="dark:text-gray-200 ">{{ filterName }}: </span><span class="font-bold text-blue-600 dark:text-white">{{ filterOption }}</span>
            <button @click="$emit('removeFilter', filterName)" class="ml-1 p-1 text-white font-bold dark:hover:bg-blue-400 hover:bg-blue-500">
                <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        class="text-blue-800 dark:text-blue-100"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { FilterConfig } from "@/types";

const props = defineProps({
    selectedFilters: {
        type: Object,
        required: true,
    },
    filters: {
        type: Array<FilterConfig>,
        required: true,
    },
});

const emit = defineEmits(['removeFilter']);

const selectedFilterTags = computed(() => {
    return Object.entries(props.selectedFilters).map(([filterName, filterOption]) => {
        const filter = props.filters.find((f) => f.name === filterName);
        if (filter && filter.type === 'range') {
            return [filterName, `${filterOption} miles`];
        }
        return [filterName, filterOption];
    });
});
</script>