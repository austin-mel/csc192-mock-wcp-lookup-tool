<template>
    <div class="inline-flex items-center gap-4">
        <MilestoneIcon v-if="with_icon" />
        <p>{{ distance }} mi </p>
    </div>
</template>


<script setup lang="ts">
import { MilestoneIcon } from '@/assets';


interface DistanceIndicatorProps {
    with_icon?: boolean;

    distance:   number;
}

defineProps<DistanceIndicatorProps>();
</script>
