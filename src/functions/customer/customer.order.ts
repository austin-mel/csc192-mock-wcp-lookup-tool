import { Comparator } from "@/hooks";
import { CustomerWithDistance, OrderDirection } from "@/types"


export namespace CustomerOrder {
    export type OrderByFields = 'customer_name' | 'distance';


    export const ByName =
        (left: CustomerWithDistance, right: CustomerWithDistance, direction: OrderDirection) => {
            const compare = left.customer_name.
                localeCompare(
                    right.customer_name,
                    undefined,              // locale
                    { sensitivity: 'base' }
                );

            return direction === 'ascending'
                ? compare
                : -compare;
        };

    export const ByDistance =
        (left: CustomerWithDistance, right: CustomerWithDistance, direction: OrderDirection) => {
            const left_distance  = left.distance  ?? Infinity;
            const right_distance = right.distance ?? Infinity;

            const compare = Math.sign(left_distance - right_distance);

            return direction === 'ascending'
                ? compare
                : -compare;
        };

    export const Comparators: Record<OrderByFields, Comparator<CustomerWithDistance>> = {
        customer_name: ByName,
        distance:      ByDistance,
    };
}
