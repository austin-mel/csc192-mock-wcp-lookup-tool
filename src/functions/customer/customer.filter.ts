import { CustomerDTO } from "@/types";


export type LastPurchased = 
    | 'all'
    | 'month'
    | 'year';


export namespace CustomerFilters {
    export const MatchesSearchTerm = (customer: CustomerDTO.Get, term: string) => {
        const normalized = term.trim().toLocaleLowerCase();
        return (
            normalized === '' ||
            customer.customer_name.toLocaleLowerCase().includes(normalized)
        )
    }

    export const ShowSuspended = (customer: CustomerDTO.Get) =>
        customer.status !== 'Suspended';

    export const InTerritory = (customer: CustomerDTO.Get, territories: string[]) =>
        territories.length === 0 ||
        territories.includes(customer.territory_number);

    export const LastPurchased = (customer: CustomerDTO.Get, last_purchased: LastPurchased) => {
        switch (last_purchased) {
            case 'all':
                return true;
            case 'month':
                return (customer.sales?.month_to_date ?? 0) > 0;
            case 'year':
                return (customer.sales?.year_to_date ?? 0) > 0;
            default:
                throw new Error('Unknown last purchased filter type passed...')
        }
    }
}