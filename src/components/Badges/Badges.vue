<template>
    <div class="flex flex-wrap gap-2">
        <span
            v-for="badge in badges"
            class="inline-flex items-center gap-x-1.5 rounded-md align-center p-1 sm:px-2 sm:py-1 text-xs font-medium ring-1 ring-inset"
            :class="BADGE_COLORS[badge.color]"
        >
            <component
                :is="badge.icon"
                class="size-4"
            />
            <span class="sr-only">{{ badge.label }}: </span>
            {{ badge.value }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Badge, BADGE_COLORS, BadgesProps } from "./Badges.props";
import { BadgeDollarSignIcon } from "@/assets";
import { ToRevenue } from "@/functions";

const { properties } = defineProps<BadgesProps>();

const badges = computed((): Badge[] => [
    {
        icon:  BadgeDollarSignIcon,
        label: 'Monthly Revenue',
        value: properties.monthly_revenue 
            ? ToRevenue(properties.monthly_revenue) + ' / month'
            : 'N/A',
        color: 'yellow',
    },
    {
        icon:  BadgeDollarSignIcon,
        label: 'Yearly Revenue',
        value: properties.yearly_revenue
            ? ToRevenue(properties.yearly_revenue) + ' / year '
            : 'N/A',
        color: 'green',
    }
]);
</script>
