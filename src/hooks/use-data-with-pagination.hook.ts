import { computed } from "vue";
import { useFetch, UseFetchOptions } from "./use-fetch.hook";
import { usePagination } from "./use-pagination.hook";


export function useDataWithPagination<T>(
    url:            string,
    items_per_page: number          = 10,
    options:        UseFetchOptions = { fetchOnMount: true }
) {
    const { data, error, is_loading, refetch } = useFetch<T[]>(url, options);

    const items = computed(() => data.value ?? []);

    const pagination = usePagination(items, items_per_page);

    return { items, error, is_loading, refetch, ...pagination, items_per_page };
}