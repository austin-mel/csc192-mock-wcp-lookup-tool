import { inject, InjectionKey, ref } from "vue";

import { CustomerOrder } from "@/functions";
import { OrderDirection } from "@/types";


export const order_by_key = Symbol() as InjectionKey<
    ReturnType<typeof useOrderByCustomersProvider>
>;

export function useOrderByCustomers() {
    const client = inject(order_by_key);

    if (!client) {
        throw new Error("Clients context cannot be found...");
    }

    return client;
}

export function useOrderByCustomersProvider() {
    interface OrderOption {
        field:     CustomerOrder.OrderByFields;
        direction: OrderDirection;
        label:     string;
    }
    
    const order_options: Array<OrderOption> = [
        { field: "customer_name", direction: "ascending",  label: "Name A→Z"     },
        { field: "customer_name", direction: "descending", label: "Name Z→A"     },
        { field: "distance",      direction: "ascending",  label: "Distance A→Z" },
        { field: "distance",      direction: "descending", label: "Distance Z→A" },
    ];
    
    const order_by = ref<OrderOption>();

    return {
        order_by,
        order_options,
    };
}
