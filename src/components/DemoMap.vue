<template>
    <div class="relative h-full min-h-[20rem] w-full overflow-hidden rounded bg-slate-100 dark:bg-slate-800">
        <div class="absolute inset-0 opacity-80">
            <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)]" />
            <div class="absolute left-[8%] top-[18%] h-[64%] w-[84%] rounded-full border border-slate-300/70 dark:border-slate-500/70" />
            <div class="absolute left-[18%] top-[30%] h-[42%] w-[64%] rotate-[-12deg] rounded-full border border-slate-300/70 dark:border-slate-500/70" />
            <div class="absolute left-[12%] top-[58%] h-1 w-[78%] rotate-[-8deg] rounded-full bg-slate-300/70 dark:bg-slate-600/70" />
            <div class="absolute left-[24%] top-[16%] h-[72%] w-1 rotate-[18deg] rounded-full bg-slate-300/70 dark:bg-slate-600/70" />
        </div>

        <button
            v-for="item in positioned_items"
            :key="item.customer_id"
            type="button"
            class="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            :style="{ left: `${item.x}%`, top: `${item.y}%` }"
            :title="item.customer_name"
            @click="emit('marker-selected', item)"
        >
            <span class="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-md ring-2 ring-white dark:ring-slate-900">
                {{ item.customer_name.slice(0, 1) }}
            </span>
            <span class="max-w-32 truncate rounded bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-700 shadow dark:bg-slate-900/90 dark:text-slate-100">
                {{ item.customer_name }}
            </span>
        </button>

        <div class="absolute bottom-3 left-3 rounded bg-white/90 px-3 py-2 text-xs text-slate-600 shadow dark:bg-slate-900/90 dark:text-slate-300">
            Synthetic demo map
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { CustomerWithDistance } from "@/types";

const { items } = defineProps<{
    items: CustomerWithDistance[];
}>();

const emit = defineEmits<{
    (event: "marker-selected", item: CustomerWithDistance): void;
}>();

const positioned_items = computed(() => {
    const valid = items.filter((item) => item.geolocation?.latitude && item.geolocation?.longitude);

    if (!valid.length) {
        return [];
    }

    const latitudes = valid.map((item) => item.geolocation!.latitude!);
    const longitudes = valid.map((item) => item.geolocation!.longitude!);
    const min_latitude = Math.min(...latitudes);
    const max_latitude = Math.max(...latitudes);
    const min_longitude = Math.min(...longitudes);
    const max_longitude = Math.max(...longitudes);
    const latitude_range = Math.max(max_latitude - min_latitude, 0.1);
    const longitude_range = Math.max(max_longitude - min_longitude, 0.1);

    return valid.map((item) => ({
        ...item,
        x: 12 + (((item.geolocation!.longitude! - min_longitude) / longitude_range) * 76),
        y: 88 - (((item.geolocation!.latitude! - min_latitude) / latitude_range) * 76),
    }));
});

defineExpose({
    reloadMarkers: () => undefined,
});
</script>
