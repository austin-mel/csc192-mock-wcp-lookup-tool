import { ClientButtonProperties, CustomerWithDistance } from "@/types";
import { get_address_point } from "@/functions";

export const getButtonInformation = (item: CustomerWithDistance): ClientButtonProperties => {
    return {
        clientData: item,
        address: get_address_point(item.address ?? {}),
        phoneNumber: item.contacts?.purchasing?.full ?? item.contacts?.accounts_payable?.full ?? 'N/A'
    };
};