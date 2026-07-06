import { onMounted, ref, Ref } from "vue";


export interface UseFetchOptions extends RequestInit
{
    fetchOnMount?: boolean
};


export function useFetch<T>(url: string, options: UseFetchOptions = {})
{
    const data:       Ref<   T   | null> = ref(null);
    const error:      Ref<string | null> = ref(null);
    const is_loading: Ref<boolean>       = ref(false);

    const { fetchOnMount, ...fetch_options } = options;

    async function fetch_data()
    {
        is_loading.value = true;
        error.value      = null;

        try {
            const response = await fetch(url, fetch_options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            data.value = await response.json() as T;
        }
        catch (err) {
            error.value = (err as Error).message;
        }
        finally {
            is_loading.value = false;
        }
    }

    if ( fetchOnMount ) {
        onMounted(() => {
            fetch_data();
        })
    }

    return {
        data, error, is_loading, refetch: fetch_data
    }
}
