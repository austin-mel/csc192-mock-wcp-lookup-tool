<template>
    <TransitionRoot as="template" :show="is_open">
        <Dialog as="div" class="relative z-10" @close="close">
            <div class="fixed inset-0 bg-gray-900/50" />

            <div class="fixed inset-0 flex">
                <DialogPanel
                    class="relative flex w-full max-w-lg flex-col bg-white shadow-xl dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                >
                    <div class="flex items-center justify-between border-b p-4">
                        <h2 class="text-lg font-semibold">Filters</h2>
                        <button id="closefilters" type="button" class="p-1" @click="close">
                            <CrossIcon
                                class="size-6 text-gray-700 dark:text-gray-100"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <!-- Filters -->
                    <div class="overflow-y-auto p-4">
                        <Filters />
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>

    <button
        class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 md:hidden dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        type="button"
        @click="is_map_view = !is_map_view"
        :aria-pressed="is_map_view"
        id="mobiletoggle"
    >
        {{ is_map_view ? "Show Results" : "Show Map" }}
    </button>

    <!-- Mobile View -->
    <div class="relative grid grow gap-2 md:hidden">
        <div v-if="!is_map_view" class="flex flex-col">
            <SearchBox
                v-model="selected_customer"
                @select-one="open_customer"
            />
            <Results @select-one="open_customer" />
            <Pagination />
        </div>
        <DemoMap
            v-else
            :items="paginated_items"
            @marker-selected="open_customer"
        />
    </div>

    <!-- Desktop View -->
    <div class="relative hidden grow grid-cols-6 gap-2 md:grid">
        <div class="flex flex-col md:col-span-2">
            <SearchBox
                v-model="selected_customer"
                @select-one="open_customer"
            />
            <Results @select-one="open_customer" />
            <Pagination />
        </div>
        <DemoMap
            :items="paginated_items"
            class="md:col-span-4"
            @marker-selected="open_customer"
        />
    </div>

    <ClientCard
        v-if="selected_customer"
        :item="selected_customer"
        @close="close_customer"
    />
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { Dialog, DialogPanel, TransitionRoot } from "@headlessui/vue";

import { CrossIcon } from "@/assets";
import { CustomerWithDistance } from "@/types";

import Pagination from "./Pagination.vue";
import Results from "./Results.vue";
import Filters from "./Filters.vue";
import DemoMap from "../DemoMap.vue";
import SearchBox from "./SearchBox.vue";
import { ClientCard } from "../ClientCard";
import { filters_key, useCustomerFiltersProvider } from "./Filters.provider";
import { customers_key, useCustomersProvider } from "./Customers.provider";
import { order_by_key, useOrderByCustomersProvider } from "./OrderBy.provider";


const filters_provider = useCustomerFiltersProvider();
provide(filters_key, filters_provider);

const order_by_provider = useOrderByCustomersProvider();
provide(order_by_key, order_by_provider);

const customers_provider = useCustomersProvider(filters_provider, order_by_provider);
provide(customers_key, customers_provider);

const { is_open, close, add_customer } = filters_provider;
const { paginated_items } = customers_provider;

const is_map_view = ref(false);

function open_customer(customer: CustomerWithDistance) {
    selected_customer.value = customer;
    add_customer(customer);
}

function close_customer() {
    selected_customer.value = undefined;
}

const selected_customer = ref<CustomerWithDistance>();
</script>
