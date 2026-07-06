import { computed, ref, Ref } from "vue"
import { OrderDirection } from "@/types"


export type Comparator<T> = (left: T, right: T, direction: OrderDirection) => number; 


interface useSortedOptions<T, K extends keyof T> {
    initial_key:        K,
    initial_direction?: OrderDirection
}


export function useSorted<T, K extends keyof T>(
    array: Ref<T[]>,
    compare_fn: Comparator<T>,
    options: useSortedOptions<T,K>
) {
    const { initial_direction } = options;

    const direction = ref<OrderDirection>(initial_direction ?? 'ascending');

    const sorted = computed(() => {
        const items = [...array.value];

        items.sort((left, right) => compare_fn(left, right, direction.value))
        
        return items;
    })

    return {
        sorted,
    }
}