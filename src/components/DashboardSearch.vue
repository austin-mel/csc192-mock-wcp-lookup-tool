<script setup lang="ts">
import { ref } from 'vue';
import { SearchIcon } from "@/assets";

const emit = defineEmits();
const searchInput = ref('');

const toggleFilter = () => {
    emit('toggleFilter');
};

const recentViews = () => {
    emit('recentViews');
};

const search = () => {
    emit('search', searchInput.value);
};

const clearSearch =() =>{
    if (searchInput.value.trim() !== ''){
        searchInput.value = '';
    }
    emit('search', '');
}

</script>

<template>
        <div class="sm:hidden py-4 flex items-center justify-between">
            <svg @click="toggleFilter" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="size-8 text-black dark:text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
                <!-- Icon for recent customers viewed -->
                <svg @click="recentViews" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-black dark:text-gray-300">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3A9 9 0 1 1 3 12 9 9 0 0 1 21 12z" />
                </svg>

                <!-- Inserting user account icon using Heroicons-->
                <RouterLink to="/account" id="accountButton" class="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-10 h-10 text-black dark:text-gray-300">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </RouterLink>
        </div>
        <div class="flex items-center justify-between">
            <!-- Filter icon for search bar -->
            <svg @click="toggleFilter" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="hidden sm:flex size-8 text-black dark:text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            <form @submit.prevent="search" class="flex w-full sm:w-3/4 search-form">
                <input type="text" v-model="searchInput" placeholder="Search by name or keyword" name="search"
                    class="flex-1 p-2 border border-gray-300 rounded-l-md text-black dark:text-white 
           bg-white dark:bg-gray-800 
           placeholder-gray-500 dark:placeholder-gray-400 
           focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600" />
                <!-- Clear Button -->
                <button type="button" @click="clearSearch"
                    class="hidden sm:flex px-3 py-2 bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-400 hover:border-gray-400">
                    ✖
                </button>
                
                <button type="submit" @submit="search"
                    class="px-4 py-2 text-white bg-black border border-black dark:border-[#FFE100] dark:bg-[#FFE100] dark:text-black rounded-r-md hover:bg-gray-800 hover:border-gray-600 dark:hover:bg-black dark:hover:border-black dark:hover:text-white">
                    <SearchIcon class="w-5 h-5 block stroke-[2.5]"/>
                </button>
            </form>

            <div class="flex items-center justify-end">
                <!-- Icon for recent customers viewed -->
                <svg @click="recentViews" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="hidden sm:flex w-10 h-10 text-black dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3A9 9 0 1 1 3 12 9 9 0 0 1 21 12z" />
                </svg>

                <!-- Inserting user account icon using Heroicons-->
                <RouterLink to="/account" id="accountButton" class="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="hidden sm:flex w-10 h-10 text-black dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </RouterLink>
            </div>
        </div>
</template>
