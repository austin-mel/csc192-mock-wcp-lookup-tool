import { inject, InjectionKey, reactive, ref } from "vue";

import { LastPurchased } from "@/functions";
import { useRecentCustomers } from "@/hooks";
import { CustomerDTO } from "@/types";


export const filters_key = Symbol() as InjectionKey<
    ReturnType<typeof useCustomerFiltersProvider>
>


export function useCustomerFilters() {
    const filter = inject(filters_key);

    if ( !filter ) {
        throw new Error('Filters context cannot be found...')
    }

    return filter;
}


export function useCustomerFiltersProvider() {
    const is_open = ref(false);

    const { recent, add_customer } = useRecentCustomers(10);

    interface FilterFields {
        search_term:    string;

        territories:    Array<CustomerDTO.Get['territory_number']>;

        show_suspended: boolean;

        last_purchased: LastPurchased;
    }

    const filters = reactive<FilterFields>({
        search_term:    '',
        territories:    [],
        show_suspended: false,
        last_purchased: 'all',
    });

    function open() {
        is_open.value = true;
    }

    function close() {
        is_open.value = false;
    }

    return {
        is_open,
        filters,
        recent,
        add_customer,
        open,
        close,
    }
}
