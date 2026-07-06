<template>
    <button id="dltoggle" @click="DarkModeStore.toggle_dark_mode"
        class="p-2 bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle dark mode">
        <SunIcon v-if="DarkModeStore.is_dark_mode" />
        <MoonIcon v-else />
    </button>

</template>


<script setup lang="ts">
import { SunIcon, MoonIcon } from "@/assets";
import { useDarkModeStore } from '@/stores';


const DarkModeStore = useDarkModeStore()
</script>