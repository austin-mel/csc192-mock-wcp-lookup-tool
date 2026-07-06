<template>
    <ul role="list" class="divide-y divide-white/5">
        <li v-for="customer in paginated_items" :key="customer.customer_id">
            {{ customer.customer_name }}
        </li>
    </ul>
</template>


<script setup lang="ts">
import { useCustomers } from './Customers.provider';

const { paginated_items } = useCustomers();
</script>