<template>
    <fieldset>
        <legend class="font-bold">Distance (mi)</legend>
        <TooltipProvider :delay-duration="0">
            <SliderRoot
                v-model="slider_value"
                class="relative mt-2 flex h-5 touch-none items-center select-none"
                :max="100"
                :step="1"
            >
                <SliderTrack
                    class="relative h-1 grow rounded-full bg-stone-900/10"
                >
                    <SliderRange
                        class="absolute inset-0 h-full rounded-full bg-stone-800 dark:bg-stone-400/50"
                    />
                </SliderTrack>

                <TooltipRoot disable-closing-trigger>
                    <TooltipTrigger as-child>
                        <SliderThumb
                            class="block size-5 rounded-xl bg-stone-200 ring-2 shadow-lg transition hover:bg-stone-300 focus:outline-none dark:hover:bg-stone-700 dark:focus:ring-stone-100"
                            aria-label="Volume"
                            id="distancefilter"
                        />
                    </TooltipTrigger>

                    <TooltipPortal>
                        <TooltipContent
                            class="z-10 rounded border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                            :side-offset="5"
                        >
                            {{ slider_value[0] }}
                            <TooltipArrow
                                class="fill-white stroke-gray-200 dark:fill-gray-800 dark:stroke-gray-600"
                            />
                        </TooltipContent>
                    </TooltipPortal>
                </TooltipRoot>
            </SliderRoot>
        </TooltipProvider>
    </fieldset>
</template>


<script setup lang="ts">
import { ref } from "vue";
import {
    SliderRoot,
    SliderTrack,
    SliderRange,
    SliderThumb,
    TooltipArrow,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger,
    TooltipPortal,
    TooltipContent,
} from "reka-ui";

const slider_value = ref([50]);
</script>
