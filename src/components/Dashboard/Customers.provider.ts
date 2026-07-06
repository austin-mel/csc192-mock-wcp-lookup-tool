import { computed, inject, InjectionKey, watch } from "vue";

import { CustomerFilters, CustomerOrder } from "@/functions";
import { useGeolocation, usePagination } from "@/hooks";
import { DemoDataService } from "@/services";
import { CustomerDTO, CustomerWithDistance } from "@/types";
import { useCustomerFiltersProvider } from "./Filters.provider";
import { calculate_distance } from "@/functions/get-distance.function";
import { useOrderByCustomersProvider } from "./OrderBy.provider";

export const customers_key = Symbol() as InjectionKey<
    ReturnType<typeof useCustomersProvider>
>;

export function useCustomers() {
    const client = inject(customers_key);

    if (!client) {
        throw new Error("Clients context cannot be found...");
    }

    return client;
}

export function useCustomersProvider(
    { filters }:  ReturnType<typeof useCustomerFiltersProvider>,
    { order_by }: ReturnType<typeof useOrderByCustomersProvider>,
) {
    const {
        latitude: user_latitude,
        longitude: user_longitude,
        error: geolocation_error,
    } = useGeolocation();

    const items = computed(() => {
        return DemoDataService.getCustomers();
    });

    const filtered = computed(() => {
        return items.value
            .filter((item) =>
                filters.show_suspended
                    ? true
                    : CustomerFilters.ShowSuspended(item),
            )
            .filter((item) =>
                CustomerFilters.LastPurchased(item, filters.last_purchased),
            )
            .filter((item) =>
                CustomerFilters.InTerritory(item, filters.territories),
            )
            .filter((item) =>
                CustomerFilters.MatchesSearchTerm(item, filters.search_term),
            );
    });

    const filtered_with_distance = computed(() => {
        return filtered.value.map((item) => {
            if (
                geolocation_error.value ||
                !item.geolocation       ||
                !user_latitude.value    ||
                !user_longitude.value
            ) {
                return item;
            }

            return {
                ...item,
                distance: calculate_distance({
                    from_latitude:  user_latitude.value,
                    from_longitude: user_longitude.value,
                    to_latitude:    item.geolocation?.latitude ?? 0.0,
                    to_longitude:   item.geolocation?.longitude ?? 0.0,
                }),
            };
        });
    });
    
    const ordered = computed(() => {
        if ( !order_by.value ) {
            return filtered_with_distance.value;
        }

        const { field, direction } = order_by.value;
        const compare = CustomerOrder.Comparators[field];

        return filtered_with_distance.value.
            slice().
            sort((left, right) => compare(left, right, direction));
    });

    const paginated = usePagination<CustomerWithDistance>(ordered);

    watch(
        () => [
            filters.search_term,
            filters.show_suspended,
            filters.territories.slice(),
        ],
        () => paginated.update_page(1),
        { deep: false },
    );

    return {
        items,
        filtered,
        ...paginated,
        error:      computed(() => null),
        is_loading: computed(() => false),
        refetch:    async () => undefined,
    };
}
