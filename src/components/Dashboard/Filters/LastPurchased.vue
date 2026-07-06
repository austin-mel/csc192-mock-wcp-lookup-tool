<template>
    <fieldset class="flex flex-col gap-2">
        <legend class="font-bold">Last Purchased</legend>
        <RadioGroupRoot
            v-model="last_purchased"
            class="mt-2 flex flex-col gap-2.5"
            default-value="default"
            aria-label="View density"
        >
            <div
                v-for="item in items"
                :key="item.value"
                class="flex items-center"
            >
                <RadioGroupItem
                    :id="`last-purchased-${item.value}`"
                    :value="item.value"
                    class="size-6 cursor-default rounded-full border bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-stone-700 data-[state=checked]:border-stone-700 data-[state=checked]:bg-stone-700 dark:data-[state=checked]:bg-white"
                >
                    <RadioGroupIndicator
                        class="flex h-full w-full items-center justify-center"
                    >
                        <span
                            class="block h-2 w-2 rounded-full bg-white dark:bg-stone-700"
                        />
                    </RadioGroupIndicator>
                </RadioGroupItem>
                <label
                    :for="`last-purchased-${item.value}`"
                    class="pl-4 text-sm leading-none"
                >
                    {{ item.label }}
                </label>
            </div>
        </RadioGroupRoot>
    </fieldset>
</template>

<script setup lang="ts">
import { LastPurchased } from "@/functions";
import { RadioGroupIndicator, RadioGroupItem, RadioGroupRoot } from "reka-ui";
import { useCustomerFilters } from "../Filters.provider";
import { toRefs } from "vue";


const { last_purchased } = toRefs(useCustomerFilters().filters);


interface LastPurchasedItem {
    label: string;

    value: LastPurchased;
}

const items: LastPurchasedItem[] = [
    { label: "All",           value: "all"   },
    { label: "In Last Month", value: 'month' },
    { label: "In Last Year",  value: 'year'  },
];
</script>
