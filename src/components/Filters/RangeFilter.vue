<template>
    <div class="w-full relative">
        <input
            type="range"
            :min="filter.min"
            :max="filter.max"
            step="1"
            :value="numericValue"
            @input="updateModelValue"
            class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#FFE100]"
        />
        <div
            class="absolute -top-2 left-0 right-0 flex justify-between text-xs text-gray-600 dark:text-white"
        >
            <span>{{ filter.min }} mi</span>
            <span>{{ filter.max }} mi</span>
        </div>
        <span v-if="modelValue" class="text-sm mt-2">{{ filter.name }}: {{ modelValue }} miles</span>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { FilterConfig } from '@/types';

const { filter, modelValue } = defineProps<{
    filter: FilterConfig;
    modelValue: string;
}>();

const numericValue = computed(() => {
    const num = Number(modelValue);
    return isNaN(num) || modelValue === '' ? 1 : num;
});

const emit = defineEmits(['update:modelValue']);

function updateModelValue(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', String(target.value));
}
</script>
