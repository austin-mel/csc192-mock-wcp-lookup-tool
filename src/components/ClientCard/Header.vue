<template>
    <div class="flex items-center justify-center md:justify-between p-4 sm:p-6 font-semibold break-words">
        <div class="flex text-center md:text-start flex-col gap-2">
            <h2 class="text-2xl md:text-4xl">{{ company_name }}</h2>
            <div class="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <CompanyStatus :client_status="client_status" />
                <ClientBadges :properties="company_properties" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BadgeProperties, CustomerStatus } from "@/types";
import ClientBadges from "../Badges/Badges.vue";
import CompanyStatus from "./Status.vue";


interface HeaderProps {
    client_status:      CustomerStatus;

    company_name:       string;

    company_properties: BadgeProperties;
}

defineProps<HeaderProps>();
</script>
