<template>
    <div class="grid gap-4 px-6 pb-6">
        <div class="grid gap-2">
            <ClientAddress with_icon :address="address" />
            <AccountNumber with_icon :account_number="account_number" />
            <DistanceIndicator with_icon :distance="distance" />
        </div>
        <hr class="border-gray-100 dark:border-gray-600" />
        <div class="grid gap-2">
            <h3 class="font-semibold">Contact Information</h3>
            <Phone with_icon :phone_number="phone_number" />
            <Email v-if="email" with_icon :email="email" />
        </div>
        <hr class="border-gray-100 dark:border-gray-600" />
        <CommentSection :comments="comments"
            @update:comments="$emit('update:comments', $event)"
            @edit-comment="$emit('edit-comment', $event)"
            @add-comment="$emit('add-comment', $event)"
        />
    </div>
</template>

<script setup lang="ts">
import { PhoneNumber } from "libphonenumber-js";

import { AddressDTO, CommentsDTO } from "@/types";
import CommentSection from "./Comments.vue";
import {
    Address as ClientAddress,
    DistanceIndicator,
    Email,
    PhoneNumber as Phone,
    AccountNumber
} from "../ContactInformation";


interface BodyProps {
    address:       AddressDTO.Get;

    comments:      CommentsDTO.Get[];

    email:         string;

    phone_number?: PhoneNumber;

    distance:      number;

    account_number:      string;
}

defineProps<BodyProps>();

//Emits to forward comment-related events

defineEmits(['update:comments', 'edit-comment', 'add-comment']);

</script>
