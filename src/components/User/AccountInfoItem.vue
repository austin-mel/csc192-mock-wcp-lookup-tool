<template>
    <!-- <div class="flex-1 min-w-0 bg-gray-100 rounded-lg dark:bg-gray-600"> -->
    <div class="flex items-center p-4 overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-700 group focus-within:ring-2 align-center">
        <component :is="icon" class="w-6 h-6 mr-4 text-gray-500 dark:text-gray-300" />
        <div>
            <p class="text-gray-500 text:sm sm:text-base text-balance dark:text-white">{{ label }}</p>
            <p class="text-sm *:font-semibold text-gray-700 break-all sm:text-xl dark:text-white">
                <slot></slot>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AccountInfoItemProps } from './AccountInfoItem.props';


defineProps<AccountInfoItemProps>();
</script>
