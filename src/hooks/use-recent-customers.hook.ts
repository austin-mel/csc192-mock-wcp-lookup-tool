import { onMounted, ref, watch } from "vue";
import { CustomerWithDistance } from "@/types";


export function useRecentCustomers(limit = 5) {
    const recent = ref<CustomerWithDistance[]>([]);

    onMounted(() => {
        const stored = localStorage.getItem('recentlyViewed');
        recent.value = stored ? JSON.parse(stored) : [];
    });

    watch(
        recent,
        (customers) => {
            localStorage.setItem('recentlyViewed', JSON.stringify(customers))
        },
        { deep: true },
    );

    function add_customer(customer: CustomerWithDistance) {
        recent.value = [
            customer,
            ...recent.value.filter((item) => item.customer_id !== customer.customer_id),
        ];

        if (recent.value.length > limit) {
            recent.value.length = limit;
        }
    }

    return {
        recent,
        add_customer,
    }
}
