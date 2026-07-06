<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CrossIcon } from "@/assets";
import { CustomerWithDistance, BadgeProperties, CustomerStatus } from "@/types";
import { getButtonInformation } from "@/functions";
import { ClientButtons, Badges as ClientBadges, CompanyStatus } from "@/components";

const recentlyViewed = ref<CustomerWithDistance[]>([]);

onMounted(() => {
    const storedItems = localStorage.getItem("recentClients");
    if(storedItems) {
        recentlyViewed.value = JSON.parse(storedItems);
    }
});

const emit = defineEmits<{
    (e: "closeRecentViews"): void;
    (e: "openClientCard", client: CustomerWithDistance): void;
}>();

/// TODO(eugene): Re-work API and be able to apply `computed`
const getBadgeInformation = (item: any): BadgeProperties => {
  return {
    monthly_revenue: item.sales?.month_to_date ?? 0,
    yearly_revenue: item.sales?.year_to_date ?? 0,
  };
};
const client_status = (item: CustomerWithDistance): CustomerStatus => 
    item.status === "Active" ? "Active" : "Suspended";

</script>

<template>
<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-75"
  @click.self="emit('closeRecentViews')">
          <div class="relative w-11/12 max-w-3xl p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 
        max-h-[80vh] overflow-y-auto">
        <div class="flex justify-end">
            <button
                type="button"
                class="flex items-center pt-2 pr-2 text-gray-400 bg-white rounded-tr-lg hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 sm:absolute sm:right-0 sm:top-0 sm:block sm:pr-4 sm:pt-4"
                @click="emit('closeRecentViews')"
            >
                <CrossIcon class="h-7 w-7" />
            </button>
        </div>

            <h2 class="mb-4 text-2xl font-semibold">
                Recently Viewed
            </h2>

            <div class="grid grid-cols-1 gap-4">
                <div v-for="item in recentlyViewed" :key="item.customer_name"
                    class="p-4 border border-gray-400 rounded-lg shadow-sm dark:bg-gray-00">

                    <!-- TODO(eugene): refactor the check of status -->
                    <!-- Badges -->
                    <ClientBadges class="hidden sm:flex" :properties="getBadgeInformation(item)" />

                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium">{{ item.customer_name }}</h3>
                        <CompanyStatus :client_status="client_status(item)" />
                    </div>
                    
                    <p>Address: {{ item.address?.address_line_1 || item.address?.address_line_2 || item.address?.address_line_3 }}
                    {{ item.address?.city }} {{ item.address?.state }} {{ item.address?.postal_code }}</p>
                    <p>Distance: {{ item.distance }} mi </p>
                    <p>Phone: {{ item.contacts?.purchasing?.full || item.contacts?.accounts_payable?.full || 'N/A' }}</p>

                    <ClientButtons :properties="getButtonInformation(item)" @openClientCard="emit('closeRecentViews'), emit('openClientCard', item)"/>

                </div>
            </div>
        </div>
    </div>
</template>
