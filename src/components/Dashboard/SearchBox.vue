<template>
    <div class="flex flex-col gap-2">
        <ComboboxRoot
            v-model="props.modelValue"
            ref="combobox_ref"
            class="relative z-10 w-full"
            @close="close"
            :default-open="true"
            :reset-search-term-on-blur="false"
        >
            <!-- Search Box -->
            <ComboboxInput
                v-model="search_term"
                class="block w-full rounded-md border border-gray-300 bg-white py-1.5 pr-12 pl-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                placeholder="Search Accounts..."
                auto-focus
            />
            <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center rounded-r-md border-l border-gray-300 bg-white px-3 text-gray-500 hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                @click="open"
                id="filterbtn"
            >
                <FilterIcon />
            </button>

            <!-- Suggestions Dropdown -->
            <ComboboxContent
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg dark:bg-gray-800"
            >
                <ComboboxGroup>
                    <ComboboxLabel
                        class="px-3 py-1 text-sm/6 text-gray-500 dark:text-gray-400"
                    >
                        Recently Viewed Accounts
                    </ComboboxLabel>
                    <ComboboxItem
                        v-for="suggestion in suggestions"
                        :key="suggestion.customer_id"
                        @click="emit('select-one', suggestion)"
                        :value="suggestion"
                        class="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {{ suggestion.customer_name }}
                    </ComboboxItem>
                </ComboboxGroup>
            </ComboboxContent>
        </ComboboxRoot>

        <div class="w-full">
            <OrderBy />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FilterIcon } from "@/assets";
import {
    ComboboxContent,
    ComboboxGroup,
    ComboboxInput,
    ComboboxRoot,
    GenericComponentInstance,
    ComboboxLabel,
    ComboboxItem,
} from "reka-ui";
import { ref, toRefs } from "vue";
import { useCustomerFilters } from "./Filters.provider";
import { CustomerWithDistance } from "@/types";
import OrderBy from "./OrderBy.vue";

interface SearchBoxEmits {
    (event: "select-one", customer: CustomerWithDistance): void;
    (event: "update:modelValue", customer: CustomerWithDistance): void;
}

interface SearchBoxProps {
    modelValue?: CustomerWithDistance;
}

const emit = defineEmits<SearchBoxEmits>();
const props = defineProps<SearchBoxProps>();

const combobox_ref = ref<GenericComponentInstance<typeof ComboboxRoot>>();
const { filters, open, close, recent: suggestions } = useCustomerFilters();
const { search_term } = toRefs(filters);
</script>
