<template>
    <div class="flex items-center justify-center w-full p-4">
        <div class="w-full max-w-md">
            <h1 class="mb-8 text-4xl font-extrabold text-center">
                Atlas Demo Dashboard
            </h1>
            <div
                class="p-8 transition-transform transform bg-white rounded-lg shadow-xl dark:bg-gray-800 bg-accent hover:scale-105">
                <h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Login</h2>
                <form class="space-y-6" @submit.prevent="handle_login">
                    <p class="rounded bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                        Demo login: demo.manager@example.com / portfolio-demo
                    </p>
                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                            Email
                        </label>
                        <div class="relative">
                            <input v-model="email" type="email" id="email" name="email" required
                                class="w-full px-4 py-2 placeholder-gray-400 border border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email" />
                            <MailIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label for="password"
                            class="block text-sm font-medium text-gray-800 dark:text-gray-200">Password</label>
                        <div class="relative">
                            <input v-model="password" type="password" id="password" name="password" required
                                class="w-full px-4 py-2 placeholder-gray-400 border border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password" />
                            <LockIcon class="absolute right-3 top-2.5 h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full px-4 py-2 text-white transform rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        :class="{ 'cursor-not-allowed opacity-75': is_loading }" :disabled="is_loading">
                        <span v-if="!is_loading">Sign In</span>
                        <div v-else class="flex items-center justify-center">
                            <LoaderIcon class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" />
                            Signing In...
                        </div>
                    </button>
                </form>
                <transition name="fade">
                    <p v-if="error_message" class="mt-4 text-sm text-center text-red-400">
                        {{ error_message }} <br />
                        Try again or Contact Support
                    </p>
                </transition>
                <transition name="fade">
                    <p v-if="success" class="mt-4 text-sm font-bold text-center text-green-400">
                        Logged In Successfully!
                    </p>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { LoaderIcon, LockIcon, MailIcon } from "@/assets";
import { useAuthStore } from "@/stores";
import { AuthSchema } from "@/types";
import { Routes } from "@/router";


const email     = ref("");
const password  = ref("");
const router    = useRouter();
const { login } = useAuthStore();


const is_loading = ref(false);
const error_message = ref("");
const success = ref(false);

async function handle_login() {
    is_loading.value = true;
    error_message.value = "";
    success.value = false;

    const result = AuthSchema.LoginRequestDTO.safeParse({
        email:    email.value,
        password: password.value,
    });

    if ( !result.success ) {
        error_message.value = result.error.errors.
            map(error => error.message).
            join(', ');
        return;
    }

    try {
        const token = await login(result.data);
        if ( !token ) {
            throw new Error("Invalid Email or Password");
        }

        success.value = true;
        router.push({ name: Routes.DASHBOARD });
    }
    catch (error) {
        error_message.value = error instanceof Error
            ? error.message
            : 'Login failed';
    }
    finally {
        is_loading.value = false;
    }
}

</script>
