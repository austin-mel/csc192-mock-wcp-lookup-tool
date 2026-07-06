<template>
    <div
        :class="{ dark: DarkModeStore.is_dark_mode }"
        class="flex flex-col min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 dark:text-white text-primary"
    >
        <Header />

        <slot />

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useDarkModeStore } from '@/stores';
import { onMounted } from "vue";


const DarkModeStore = useDarkModeStore();

onMounted(() => {
    DarkModeStore.init();
});
</script>
