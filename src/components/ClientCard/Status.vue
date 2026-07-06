<template>
    <span
        class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium"
        :class="properties.colors"
    >
        <component :is="properties.icon" />
        <span class="sr-only">Status: </span>
        {{ properties.status }}
    </span>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { CompanyStatusProps, STATUS_PROPERTIES, StatusProperties } from "./Status.props";


const { client_status } = defineProps<CompanyStatusProps>();

const properties = computed((): StatusProperties => STATUS_PROPERTIES[client_status]);
</script>