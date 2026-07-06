<template>
    <div class="flex items-center justify-center mb-2 sm:mb-6">
        <div
            class="flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-300 rounded-full sm:h-28 sm:w-28"
        >
            <span class="text-2xl font-bold text-gray-700 sm:text-4xl">
                {{ initials }}
            </span>
        </div>
        <div class="ml-6">
            <h1 class="text-xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                {{ `${first_name} ${last_name}` }}
            </h1>
            <p
                :class="[ 
                    role === 'Admin'
                        ? 'bg-amber-500 text-amber-900 dark:bg-amber-600 dark:text-amber-100'
                        : '',
                    role === 'Manager'
                        ? 'bg-violet-500 text-white dark:bg-violet-600 dark:text-violet-100'
                        : '',
                    role === 'Representative'
                        ? 'bg-blue-500 text-white dark:bg-blue-600 dark:text-blue-100'
                        : '',
                    role === 'User'
                        ? 'bg-zinc-500 text-white dark:bg-zinc-600 dark:text-zinc-100'
                        : '',
                    'text-sm sm:text-base rounded p-1 font-semibold text-center',
                ]"
            >
                {{ role }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores';


const { user_info } = useAuthStore();
const { first_name, last_name, role } = user_info!;

// Auto-generate initials
const initials = computed(() => {
    const first = first_name.charAt(0) || '';
    const last  = last_name.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
});
</script>