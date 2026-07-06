<script setup lang="ts">
import { CrossIcon } from "@/assets";
import { AccountHeader, AccountInfo } from "@/components";
import { Routes } from '@/router'
</script>

<template>
    <section
        class="relative grid w-full max-w-xl grid-cols-1 p-2 mx-auto bg-white rounded-lg sm:max-w-2xl dark:bg-gray-800 sm:p-6"
    >
        <!-- Close Profile Button -->
        <RouterLink
            :to="{ name: Routes.DASHBOARD }"
            id="exitAccountPage"
            class="flex items-center justify-end pt-2 pr-2 text-gray-400 bg-white rounded-tr-lg sm:pt-4 sm:pr-4 dark:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:absolute sm:right-0 sm:top-0 sm:block"
        >
            <CrossIcon class="h-7 w-7" />
        </RouterLink>

        <AccountHeader />
        <AccountInfo />
    </section>
</template>