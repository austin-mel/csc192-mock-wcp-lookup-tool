<template>
    <header class="w-full px-6 py-4 bg-primary-400 shadow-md dark:bg-primary-900">
        <div class="flex flex-col items-center justify-between gap-4 mx-auto sm:flex-row sm:gap-0 max-w-7xl">
            <RouterLink to="/"
                class="flex items-center space-x-2 text-black hover:text-blue-400 dark:hover:text-blue-600">
                <span class="flex size-11 items-center justify-center rounded bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                    AD
                </span>
                <span class="text-xl font-bold tracking-normal text-slate-950 dark:text-white">
                    Atlas Demo
                </span>
            </RouterLink>
            <nav class="flex items-center space-x-4">
                <RouterLink id="navdash" :to="{ name: Routes.DASHBOARD }"  v-if="auth.is_logged_in">Dashboard</RouterLink>
                <RouterLink id="navaccount" :to="{ name: Routes.ACCOUNT }" v-if="auth.is_logged_in">Profile</RouterLink>
                <DarkModeToggle />
                <button type="button" @click="logout"
                    v-if="auth.is_logged_in"
                    id="logoutbtn"
                    class="flex items-center flex-grow gap-2 px-2 py-1 text-red-600 rounded-md dark:text-red-400 hover:text-red-100 hover:bg-red-600">
                    <LogoutIcon />
                    <span class="hidden sm:inline">Logout</span>
                </button>
            </nav>
        </div>
    </header>
</template>



<script setup lang="ts">
import { LogoutIcon } from "@/assets";
import { DarkModeToggle } from "@/components";
import { Routes } from "@/router";
import { useAuthStore } from "@/stores";

const { logout } = useAuthStore()

const auth = useAuthStore();
</script>
