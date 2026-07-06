<template>
    <div class="inline-flex items-center gap-4">
        <div class="max-w-[400px]:hidden">
            <MapPinIcon class="h-4 w-4 flex-shrink-0" />
        </div>
        <address :class="{ 'not-italic': not_italic }">
            <p v-if="address.address_line_1">{{ address.address_line_1 }}</p>
            <p v-if="address.address_line_2">{{ address.address_line_2 }}</p>
            <p v-if="address.address_line_3">{{ address.address_line_3 }}</p>
            <p v-if="address.city && address.state && address.postal_code">
                {{ address.city }}, {{ address.state }} {{ address.postal_code }}
            </p>
        </address>
    </div>
</template>

<script setup lang="ts">
import { MapPinIcon } from "@/assets";
import { AddressDTO } from "@/types";

interface AddressProps {
    with_icon?:  boolean;

    address:     AddressDTO.Get;

    not_italic?: boolean;
}

defineProps<AddressProps>();
</script>
