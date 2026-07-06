<template>
    <div class="inline-flex items-center gap-4">
        <EmailIcon v-if="with_icon" />
        <p>{{ email }}</p>
    </div>
</template>

<script setup lang="ts">
import { EmailIcon } from "@/assets";

interface EmailProps {
    email:      string;

    with_icon?: boolean;
}

defineProps<EmailProps>();
</script>
