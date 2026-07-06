<template>
    <div class="flex flex-col space-y-2">
        <label v-for="option in filter.options" :key="option" class="flex items-center space-x-2">
            <input
                type="radio"
                :name="filter.name"
                :value="option"
                class="radio"
                v-model="numericValue"
                @change="$emit('update:modelValue', option)"
            />
            <span class="text-sm">{{ option }}</span>
        </label>
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
    return modelValue;
});

const emit = defineEmits(['update:modelValue']);
</script>