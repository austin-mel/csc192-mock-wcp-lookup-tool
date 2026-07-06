<template>
    <div class="w-full max-w-xl p-4 mx-auto">
        <div class="relative pt-1">
            <input type="range" :min="min" :max="max" :step="step" v-model="value"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div class="flex justify-between w-full px-2 mt-2">
                <span v-for="n in steps" :key="n" class="text-xs text-gray-600"
                    :class="{ 'font-bold text-blue-600': value >= n * step + min }">
                    {{ n * step + min }}
                </span>
            </div>
        </div>
        <div class="mt-4 text-center">
            <span class="text-2xl font-bold text-blue-600">{{ value }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    step: {
        type: Number,
        default: 20
    }
})

const value = ref(props.min)

const steps = computed(() => {
    return (props.max - props.min) / props.step
})
</script>

<style scoped>
input[type="range"] {
    -webkit-appearance: none;
    @apply w-full h-2 bg-gray-200 rounded-lg outline-none opacity-70 transition-opacity duration-200 ease-in-out;
}

input[type="range"]:hover {
    @apply opacity-100;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply w-6 h-6 bg-blue-600 rounded-full cursor-pointer;
}

input[type="range"]::-moz-range-thumb {
    @apply w-6 h-6 bg-blue-600 border-0 rounded-full cursor-pointer;
}
</style>