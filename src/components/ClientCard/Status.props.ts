import { Component } from "vue";
import { CustomerStatus } from "@/types";
import { ShieldBanIcon, ShieldCheckIcon } from "@/assets";


export interface CompanyStatusProps {
    client_status: CustomerStatus;
}


export interface StatusProperties {
    colors: string[];

    status: CustomerStatus;

    icon:   Component;
}


export const STATUS_PROPERTIES: Record<CustomerStatus, StatusProperties> = {
    'Active': {
        icon: ShieldCheckIcon,
        status: 'Active',
        colors: ['text-green-900', 'bg-green-200', 'dark:bg-green-600', 'dark:text-green-200']
    },
    'Suspended': {
        icon: ShieldBanIcon,
        status: 'Suspended',
        colors: ['text-red-900', 'bg-red-200', 'dark:bg-red-600', 'dark:text-red-200']
    }
}
