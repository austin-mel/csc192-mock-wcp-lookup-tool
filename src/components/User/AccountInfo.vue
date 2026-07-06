<template>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6" id="accountinfo">
        <!-- Full Name -->
        <AccountInfoItem label="Full Name" :icon="UserIcon">
            {{ `${first_name} ${last_name}` }}
        </AccountInfoItem>

        <!-- Region -->
        <AccountInfoItem label="Region" :icon="BuildingIcon">
            {{ user_info!.territory_number }}
        </AccountInfoItem>

        <!-- Date of Hire -->
        <AccountInfoItem label="Date of Hire" :icon="CalendarIcon">
            <template v-if="hire_date">
                <div>{{ hire_date.format('MMM D, YYYY') }}</div>
                <div class="text-sm/6 text-gray-500/80 dark:text-gray-400/80">{{ hire_date.fromNow() }}</div>
            </template>
            <template v-else>
                N/A
            </template>
        </AccountInfoItem>

        <!-- Assigned Accounts -->
        <AccountInfoItem label="Assigned Accounts" :icon="UsersIcon">
            {{
                customers.
                    filter(customer => customer.territory_number === user_info?.territory_number).
                    length
            }}
        </AccountInfoItem>

        <!-- Email Address -->
        <AccountInfoItem label="Email Address" :icon="EmailIcon">
            <a :href="`mailto:${email}`">
                {{ email }}
            </a>
        </AccountInfoItem>

        <!-- Phone Number -->
        <AccountInfoItem label="Phone Number" :icon="PhoneOutgoingIcon">
            <a
                v-if="full_number"
                :href="`tel:${full_number.getURI()}`"
            >
                <div>
                    {{ full_number.format('NATIONAL', { formatExtension: (number) => number }) }}
                </div>
                <div v-if="full_number.ext">
                    Ext. {{ full_number.ext }}
                </div>
            </a>
            <span v-else>N/A</span>
        </AccountInfoItem>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";

import {
    UserIcon,
    BuildingIcon,
    CalendarIcon,
    PhoneOutgoingIcon,
    EmailIcon,
    UsersIcon,
} from "@/assets";
import { dayjs } from '@/plugins';
import { DemoDataService } from "@/services";
import { useAuthStore, useLocaleStore } from "@/stores";
import AccountInfoItem from "./AccountInfoItem.vue";

const { user_info }    = useAuthStore();
const { country_code } = useLocaleStore();

const {
    first_name,
    last_name, 
    date_of_hire,
    email,
} = user_info!;

// Handle phone number parsing safely
const full_number = computed(() => {
    if (!user_info?.phone_number) {
        return null;
    }

    const parsed = parsePhoneNumberFromString(user_info.phone_number, country_code);
    return parsed ? parsed : null;
});

const hire_date = computed(() => {
    if (!date_of_hire) {
        return null;
    }

    return dayjs(date_of_hire);
});

const customers = computed(() => {
    return DemoDataService.getCustomers();
});
</script>
