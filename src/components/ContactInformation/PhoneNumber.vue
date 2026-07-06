<template>
    <div class="inline-flex items-center gap-4">
        <PhoneIcon v-if="with_icon" />
        <p v-if="phone_number?.isValid()">
            {{ phone_number!.formatNational() }}
        </p>
        <p v-else>N/A</p>
    </div>
</template>


<script setup lang="ts">
import { PhoneNumber } from "libphonenumber-js/max";
import { PhoneIcon } from "@/assets";


export interface PhoneNumberProps {
    phone_number?: PhoneNumber;

    with_icon?:    boolean;
}


defineProps<PhoneNumberProps>();
</script>
