<template>
    <div class="grid grid-cols-1 gap-y-8">
        <ShowSuspended />
        <Distance />
        <LastPurchased />
        <TerritoryNumber />
    </div>
</template>


<script setup lang="ts">
import Distance from "./Filters/Distance.vue";
import LastPurchased from "./Filters/LastPurchased.vue";
import ShowSuspended from "./Filters/ShowSuspended.vue";
import TerritoryNumber from "./Filters/TerritoryNumber.vue";
</script>
