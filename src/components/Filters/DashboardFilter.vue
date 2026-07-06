<script setup lang="ts">
import { inject, Ref } from 'vue';
import { FilterConfig } from "@/types";
import { RangeFilter, OptionFilter, SelectedFilterTags } from './index';

const selectedFilters = inject<Ref<{ [key: string]: string }>>('selectedFilters');
const outsideBounds = inject<Ref<boolean>>('outsideBounds');

if (!selectedFilters || !outsideBounds) {
  throw new Error("Missing provided filter state");
}

const filters: FilterConfig[] = [
  {
    name: 'Distance',
    type: 'range',
    min: 1,
    max: 10,
  },
  {
    name: 'Within Your Region',
    type: 'options',
    options: ['Yes', 'No'],
  },
  {
    name: 'Purchased in Last Month',
    type: 'options',
    options: ['Yes', 'No'],
  },
    {
    name: 'Purchased in Last Year',
    type: 'options',
    options: ['Yes', 'No'],
  },
  {
    name: 'Status',
    type: 'options',
    options: ['Active', 'Suspended'],
  },
];

// Handle filter selection
const selectFilter = (filterName: string, filterOption: string) => {
    selectedFilters.value[filterName] = filterOption;
};

// Clear all filters
const clearFilters = () => {
    selectedFilters.value = {};
    outsideBounds.value = false;
};

// Remove a single filter
const removeFilter = (filterName: string) => {
    delete selectedFilters.value[filterName];
    selectedFilters.value = { ...selectedFilters.value };
};

</script>
<template>
    <div class="flex flex-col w-full p-5 text-black dark:text-white">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <div class="mb-2 filter-group">
                <h2 class="mb-2 font-semibold text-md">Search All Accounts</h2>
                <input
                    type="checkbox"
                    id="outside-bounds"
                    v-model="outsideBounds"
                    class="h-5 w-5 text-black dark:text-white border-gray-300 rounded focus:ring-black dark:focus:ring-white"
                />
            </div>
            <div v-for="filter in filters" :key="filter.name" class="mb-2 filter-group">
                <h2 class="mb-2 font-semibold text-md">{{ filter.name }}</h2>

                <RangeFilter
                    v-if="filter.type === 'range'"
                    :filter="filter"
                    v-model="selectedFilters[filter.name]"
                    @update:modelValue="selectFilter(filter.name, $event)"
                />

                <OptionFilter
                    v-else-if="filter.type === 'options'"
                    :filter="filter"
                    v-model="selectedFilters[filter.name]"
                    @update:modelValue="selectFilter(filter.name, $event)"
                />
            </div>
        </div>

        <SelectedFilterTags :selectedFilters="selectedFilters" :filters="filters" @removeFilter="removeFilter" />

        <div class="flex justify-end mt-4">
            <button @click="clearFilters" class="px-4 py-2 text-sm text-white bg-red-500 rounded">
                Clear Filters
            </button>
        </div>
    </div>
</template>
