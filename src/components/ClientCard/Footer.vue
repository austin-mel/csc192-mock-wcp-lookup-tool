<template>
    <div class="flex flex-wrap justify-center sm:justify-between gap-8 sm:gap-4 p-6">
        <div class="inline-flex gap-4">
            <a
                v-if="phone_number?.isValid()"
                :href="phone_number!.getURI()"
                class="inline-flex items-center gap-x-1.5 rounded-md px-3 py-1 font-medium ring-1 ring-inset"
                id="callbutton"
            >
                <PhoneOutgoingIcon class="mr-1" />
                Call
            </a>
        </div>
        <button
            type="button"
            @click="show_demo_directions"
            class="inline-flex items-center gap-x-1.5 rounded-md px-3 py-1 font-medium ring-1 ring-inset"
            id="directionsbutton"
        >
            <MapIcon class="mr-1" />
            Directions
        </button>
    </div>
</template>


<script setup lang="ts">
import { PhoneNumber } from 'libphonenumber-js/max';
import { MapIcon, PhoneOutgoingIcon } from "@/assets";
import { AddressDTO } from "@/types";


interface CardFooterProps {
    email?:         string;

    address?:       AddressDTO.Get;
    
    phone_number?:  PhoneNumber;
}

const props = defineProps<CardFooterProps>();

function show_demo_directions() {
    const city = props.address?.city ?? "this synthetic account";
    alert(`Demo directions for ${city}.`);
}
</script>
