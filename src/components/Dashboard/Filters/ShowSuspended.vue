<template>
    <fieldset>
        <legend class="font-bold">Account Status</legend>
        <SwitchGroup as="div" class="align-center flex gap-2 mt-2">
            <Switch
                v-model="show_suspended"
                :class="[
                    show_suspended ? 'bg-stone-700' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:outline-hidden',
                ]"
                id="statusfilter"
            >
                <span
                    :class="[
                        show_suspended ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    ]"
                >
                    <span
                        :class="[
                            show_suspended
                                ? 'opacity-0 duration-100 ease-out'
                                : 'opacity-100 duration-200 ease-in',
                            'absolute inset-0 flex size-full items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                    >
                        <ToggleDisabledIcon class="size-3 text-stone-400" />
                    </span>
                    <span
                        :class="[
                            show_suspended
                                ? 'opacity-100 duration-200 ease-in'
                                : 'opacity-0 duration-100 ease-out',
                            'absolute inset-0 flex size-full items-center justify-center transition-opacity',
                        ]"
                        aria-hidden="true"
                    >
                        <ToggleEnabledIcon class="size-3 text-stone-700" />
                    </span>
                </span>
            </Switch>
            <SwitchLabel passive>Show Suspended Accounts</SwitchLabel>
        </SwitchGroup>
    </fieldset>
</template>

<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { toRefs } from "vue";

import { ToggleDisabledIcon, ToggleEnabledIcon } from "@/assets";
import { useCustomerFilters } from "../Filters.provider";


const { show_suspended } = toRefs(useCustomerFilters().filters);
</script>
