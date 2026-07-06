import { AddressDTO } from "@/types";

export function get_address_point(address: AddressDTO.Get): string {
    if (!address.city || !address.state || !address.postal_code) {
        return "0,0";
    }

    if (!address.address_line_1) {
        return `${address.city}, ${address.state} ${address.postal_code}`;
    }
    
    return `${address.address_line_1}, ${address.city}, ${address.state} ${address.postal_code}`;
}
