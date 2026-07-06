<template>
    <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.href"
        target="_blank"
        class="dark:text-black dark:hover:text-white bg-[#FFE100] border-6 border-black rounded-full p-1">        
        <component :is="link.icon" class="w-5 h-5" />
            <span class="sr-only">{{ link.name }}</span>
    </a>
</template>


<script setup lang="ts">
import { links } from './links.data';
</script>