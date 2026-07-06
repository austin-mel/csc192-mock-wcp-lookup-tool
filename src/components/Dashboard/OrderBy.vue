<template>
    <SelectRoot v-model="order_by" name="order-by">
        <SelectTrigger
            class="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
            id="orderby"
            >
            <SelectValue placeholder="Order By..." />
            <ChevronDownIcon class="size-5" />
        </SelectTrigger>

        <SelectPortal class="p-1.5">
            <SelectContent
                class="z-20 block w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
            >
                <SelectScrollUpButton />

                <SelectViewport class="px-2">
                    <SelectLabel class="px-2 text-sm/6 leading-6 text-gray-500">
                        Order By
                    </SelectLabel>
                    <SelectItem
                        v-for="option in order_options"
                        :key="`${option.field}-${option.direction}`"
                        :value="option"
                        class="rounded-xs px-2 py-1.5 data-[disabled]:pointer-events-none data-[disabled]:text-gray-400 data-[highlighted]:bg-gray-200 data-[highlighted]:outline-none dark:data-[highlighted]:bg-gray-800"
                        :id="`order-by-${option.field}-${option.direction}`"
                        >
                        <SelectItemIndicator />
                        <SelectItemText>
                            {{ option.label }}
                        </SelectItemText>
                    </SelectItem>
                </SelectViewport>

                <SelectScrollDownButton />
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>


<script setup lang="ts">
import {
    SelectContent,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'reka-ui';
import { ChevronDownIcon } from '@/assets';
import { useOrderByCustomers } from './OrderBy.provider';


const { order_by, order_options } = useOrderByCustomers();
</script>
