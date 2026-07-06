import { CustomerDTO } from "@/types"
import { FilterFunction } from "."


export namespace CustomerFilters {
    export interface FilterMap {
        customer_name:    FilterFunction<CustomerDTO.Get, CustomerDTO.Get['customer_name']>;

        territory_number: FilterFunction<CustomerDTO.Get, Array<CustomerDTO.Get['territory_number']>>;

        status:           FilterFunction<CustomerDTO.Get, Array<CustomerDTO.Get['status']>>;

        customer_class:   FilterFunction<CustomerDTO.Get, Array<CustomerDTO.Get['customer_class']>>;
    }

    export const Functions: FilterMap = {
        customer_name: (customer, value) =>
            customer.customer_name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        
        territory_number: (customer, value) =>
            value.length === 0 ||
            value.some((territory => customer.territory_number === territory)),

        status: (customer, value) =>
            value.length === 0 ||
            value.some((status) => customer.status === status),

        customer_class: (customer, value) =>
            value.length === 0 ||
            value.some((customer_class) => customer.customer_class === customer_class),
    }
}