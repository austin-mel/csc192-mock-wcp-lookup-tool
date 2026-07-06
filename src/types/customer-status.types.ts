export const CustomerStatuses = [
    'Suspended',
    'Active'
] as const;


export type CustomerStatus = typeof CustomerStatuses[number];
