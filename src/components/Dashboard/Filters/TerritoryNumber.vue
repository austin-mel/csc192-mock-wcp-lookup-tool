<template>
    <fieldset>
        <legend class="font-bold">Region</legend>
        <CheckboxGroupRoot v-model="territories" class="flex flex-col gap-2.5 mt-2">
            <div
                v-for="item in items.slice(0, 3)"
                :key="item.value"
                class="flex items-center gap-3"
            >
                <CheckboxRoot
                    :value="item.value"
                    class="hover:bg-stone-100 data-[state=checked]:bg-stone-700 size-6 rounded-md bg-white shadow outline-none focus-within:shadow-[0_0_0_2px_black]"
                    :id="`territoryfilter-${item.value}`"
                >
                    <CheckboxIndicator
                        class="flex h-full w-full items-center justify-center"
                    >
                        <CheckIcon class="size-3.5 text-white" />
                    </CheckboxIndicator>
                </CheckboxRoot>
                <span class="select-none dark:text-white">
                    {{ item.value }} - {{ item.label }}
                </span>
            </div>

            <template v-if="items.length > 3">
                <CollapsibleRoot
                    v-model:open="show_more_options"
                    class="flex flex-col gap-2.5"
                >
                    <CollapsibleContent
                        class="flex flex-col gap-2.5"
                    >
                        <div
                            v-for="item in items.slice(3)"
                            :key="item.value"
                            class="flex items-center gap-3"
                        >
                            <CheckboxRoot
                                :value="item.value"
                                class="hover:bg-stone-100 data-[state=checked]:bg-stone-700 size-6 rounded-md bg-white shadow outline-none focus-within:shadow-[0_0_0_2px_black]"
                            >
                                <CheckboxIndicator
                                    class="flex h-full w-full items-center justify-center"
                                >
                                    <CheckIcon class="size-3.5 text-white" />
                                </CheckboxIndicator>
                            </CheckboxRoot>
                            <span class="select-none dark:text-white">
                                {{ item.value }} - {{ item.label }}
                            </span>
                        </div>
                    </CollapsibleContent>

                    <CollapsibleTrigger
                        class="text-stone-600 dark:text-stone-300 dark:hover:text-stone-100 hover:text-stone-900 mt-2.5 inline-flex cursor-pointer items-center gap-1 self-start text-sm focus:outline-none"
                    >
                        <component
                            :is="
                                show_more_options
                                    ? FoldVerticalIcon
                                    : UnfoldVerticalIcon
                            "
                            class="size-4"
                        />
                        <span>
                            {{ show_more_options ? "Show less" : "Show more" }}
                        </span>
                    </CollapsibleTrigger>
                </CollapsibleRoot>
            </template>
        </CheckboxGroupRoot>
    </fieldset>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import {
    CheckboxGroupRoot,
    CheckboxIndicator,
    CheckboxRoot,
    CollapsibleContent,
    CollapsibleRoot,
    CollapsibleTrigger,
} from "reka-ui";
import { CheckIcon, FoldVerticalIcon, UnfoldVerticalIcon } from "@/assets";
import { useCustomers } from "../Customers.provider";
import { useCustomerFilters } from "../Filters.provider";

const show_more_options = ref(false);

const { items: customers } = useCustomers();
const { territories } = toRefs(useCustomerFilters().filters);

const items = computed(() => {
    const unique = Array.from(
        new Map(
            customers.value.map(customer => [customer.territory_number, customer.sales_rep_name])
        ).entries()
    );

    unique.sort(([left], [right]) => left.localeCompare(right));

    return unique.map(([territory_number, representative_name]) => ({
        label: representative_name,
        value: territory_number,
    }));
});
</script>
