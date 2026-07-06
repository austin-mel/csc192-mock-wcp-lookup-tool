<script setup lang="ts">
import { ClientButtonProperties } from "@/types";
import { CallIcon, ClientIcon, MapButtonIcon } from "@/assets";

const props = defineProps<{
    properties: ClientButtonProperties;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: "openClientCard", client: any): void;
}>();

const mapDirection = (address: string) => {
    if (!address || address.trim() === '') {
        return alert("address is missing or incomplete");
    }
    return alert(`Demo directions for: ${address}`);
};

const dialPhone = (phone: string) => {
    if (!phone || phone === 'N/A') {
        return alert("Phone number does not exist or incomplete");
    }
    const numberCorrection = phone.replace(/[^\d+]/g, "");
    if (numberCorrection) {
        const number = `tel:${numberCorrection}`;
        window.location.href = number;
    } else {
        return alert("Phone number format is wrong");
    }
};
</script>

<template>
    <div class="flex flex-wrap justify-center sm:justify-end gap-2 pt-2">

        <button
            :disabled="disabled"
            @click="emit('openClientCard', properties.clientData)"
            class="flex items-center gap-2 rounded border-[#FFE100] bg-[#FFE100] bg-opacity-85 px-3 py-1 text-xs font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <ClientIcon class="h-6 w-4 shrink-0" />
            <span class="whitespace-nowrap">View Account</span>
        </button>
  
        <button
            :disabled="disabled"
            @click="mapDirection(properties.address)"
            class="flex items-center gap-2 rounded border-[#FFE100] bg-[#FFE100] bg-opacity-85 px-3 py-1 text-xs font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <MapButtonIcon class="h-6 w-4 shrink-0" />
            <span class="whitespace-nowrap">Directions</span>
        </button>
  
        <button
            :disabled="disabled"
            @click="dialPhone(props.properties.phoneNumber)"
            class="flex items-center gap-2 rounded border-[#FFE100] bg-[#FFE100] bg-opacity-85 px-3 py-1 text-xs font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <CallIcon class="h-6 w-4 shrink-0" />
            <span class="whitespace-nowrap">Call</span>
        </button>
    </div>
</template>
  
