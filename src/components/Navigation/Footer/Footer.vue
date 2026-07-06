<template>
    <footer class="w-full px-6 py-6 bg-primary-400 dark:bg-primary-900 mt-auto">
        <div class="flex flex-col items-center justify-between mx-auto max-w-7xl sm:flex-row">
            <div class="mb-4 text-sm dark:text-gray-400 sm:mb-0">
                &copy; {{ current_year }} Atlas Demo. Synthetic portfolio data only.
            </div>
            <div class="flex space-x-4">
                <SocialMediaLinks />
            </div>
        </div>
    </footer>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { SocialMediaLinks } from "../SocialMediaLinks";

const current_year = ref(new Date().getFullYear());
</script>
