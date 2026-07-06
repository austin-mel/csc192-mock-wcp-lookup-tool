<template>
    <div class="flex items-center justify-center w-full p-4">
        <div class="w-full max-w-lg rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <div class="mx-auto mb-8 max-w-sm">
                <img
                    class="h-auto w-full rounded-md"
                    :src="NotFound"
                    alt="HTTP 404 | Not Found"
                />
            </div>
            <h1
                class="mb-2 text-center text-2xl font-bold text-gray-700 sm:text-3xl dark:text-white"
            >
                404 | Not Found
            </h1>
            <p class="mb-8 text-center text-black dark:text-gray-200">
                Sorry, this page does not exist. It may have been removed, had its
                name changed, or is temporarily unavailable.
            </p>
            <div
                @mouseover="pause_countdown"
                @mouseleave="resume_countdown"
                @click="redirect_home"
                class="text-center"
            >
                <button
                    to="/"
                    class="inline-block rounded-md bg-slate-600 px-6 py-2 text-white transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                    Back Home
                </button>
            </div>
            <p class="mt-2 text-center text-black dark:text-gray-200">
                You will be redirected in
                <span class="font-bold dark:text-red-700">{{ formatted_time }}</span> seconds
            </p>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";

import { NotFound } from "@/assets";
import { Routes } from "@/router";

const router = useRouter();

const countdown = ref<number>(10);
const is_paused = ref<boolean>(false);

const formatted_time = computed(() => countdown.value.toFixed(0));

let interval: NodeJS.Timeout | null = null;

function start_countdown() {
    interval = setInterval(() => {
        if (!is_paused.value) {
            countdown.value -= 1;

            if (countdown.value <= 0) {
                clearInterval(interval!);
                redirect_home();
            }
        }
    }, 1000);
}

function pause_countdown() {
    is_paused.value = true;
}

function resume_countdown() {
    is_paused.value = false;
}

function redirect_home() {
    router.push({ name: Routes.LOGIN });
}

onMounted(() => {
    start_countdown();
});

onUnmounted(() => {
    if (interval) {
        clearInterval(interval);
    }
});
</script>
