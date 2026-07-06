<script setup lang="ts">
import { Navigation } from "@/components";
import { RouterView } from "vue-router";
</script>

<template>
    <Navigation>
        <main class="flex flex-col justify-center p-2 overflow-hidden grow sm:p-3 gap-2">
            <RouterView />
        </main>
    </Navigation>
</template>
