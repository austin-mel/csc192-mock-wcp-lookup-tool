<template>
    <template v-if="is_loading">
        <LoaderPinwheelIcon class="size-7 flex-1 animate-spin self-center" />
    </template>

    <ul v-else id="resultstable" role="list" class="divide-y divide-gray-200 dark:divide-white/5">
        <li
            v-for="customer in paginated_items"
            :key="customer.customer_id"
            class="relative flex items-center space-x-4 py-4 text-sm/6 sm:text-base"
            @click="emit('select-one', customer)"
            :id="`${customer.customer_name.replace(/\s+/g, '-')}`"
        >
            <div class="flex min-w-0 flex-auto flex-col sm:gap-1">
                <div class="flex items-center gap-x-3">
                    <h2 class="min-w-0 font-semibold dark:text-white">
                        <a href="#" class="flex items-center gap-x-2">
                            <span class="truncate">
                                {{ customer.customer_name }}
                            </span>
                            <div
                                :class="[
                                    customer.status === 'Active'
                                        ? 'bg-green-400/10 text-green-400 dark:bg-green-400/20 dark:text-green-300'
                                        : '',
                                    customer.status === 'Suspended'
                                        ? 'bg-red-400/10 text-red-400 dark:bg-red-400/20 dark:text-red-300'
                                        : '',
                                    'flex-none rounded-full p-1',
                                ]"
                            >
                                <div class="size-2 rounded-full bg-current" />
                            </div>
                            <div>
                                <span class="sr-only">Account Status</span>
                                <span>
                                    {{ customer.status }}
                                </span>
                            </div>
                            <span class="absolute inset-0" />
                        </a>
                    </h2>
                </div>
                <Badges
                    :properties="{
                        monthly_revenue: customer.sales?.month_to_date,
                        yearly_revenue: customer.sales?.year_to_date,
                    }"
                />
                <div
                    class="flex items-center gap-x-2.5 text-xs/5 text-gray-500 sm:text-base/5 dark:text-gray-400"
                >
                    <p :class="[
                        !customer.address?.address_line_1
                            ? 'italic'
                            : '',
                        'truncate'
                    ]">
                        {{ customer.address?.address_line_1 ?? 'Address is missing' }}
                    </p>
                    <SeparatorCircleIcon
                        class="size-1 flex-none fill-gray-300"
                    />
                    <p class="whitespace-nowrap">
                    {{ 
                        customer.distance
                            ? `${customer.distance.toFixed(1)} mi.`
                            : 'Unknown'
                    }}
                    </p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { LoaderPinwheelIcon, SeparatorCircleIcon } from "@/assets";
import { Badges } from "@/components";
import { useCustomers } from "./Customers.provider";
import { CustomerWithDistance } from "@/types";

interface CustomerResultsEmits {
    (event: "select-one", customer: CustomerWithDistance): void;
}

const emit = defineEmits<CustomerResultsEmits>();

const { paginated_items, is_loading } = useCustomers();
</script>
