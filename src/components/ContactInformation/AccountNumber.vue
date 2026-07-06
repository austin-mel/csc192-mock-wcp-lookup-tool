<template>
    <div class="inline-flex items-center gap-4">
        <UserIcon v-if="with_icon" />
        <p>{{ account_number }}</p>
    </div>
</template>

<script setup lang="ts">
import { UserIcon } from "@/assets";

interface EmailProps {
    account_number: string;

    with_icon?: boolean;
}

defineProps<EmailProps>();
</script>
