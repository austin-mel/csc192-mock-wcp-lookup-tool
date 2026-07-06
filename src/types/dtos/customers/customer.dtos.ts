import { z } from "zod";

import { CustomerStatuses } from "../../customer-status.types";
import { AddressSchema } from '../address.dtos';
import { GeolocationScheme } from '../geolocation.dtos';
import { IDSchema } from '../ids.dtos';
import { CustomerSalesScheme } from "./sales.dtos";
import { CustomerContactsScheme } from "./contacts.dtos";


export namespace CustomerSchema {
    export const GetDTO = z.object({
        customer_id:      IDSchema.CustomerID,

        customer_name:    z.string(),

        customer_class:   z.string(),

        address:          AddressSchema.GetDTO.optional(),

        contacts:         CustomerContactsScheme.GetDTO.optional(),

        geolocation:      GeolocationScheme.GetDTO.optional(),

        sales:            CustomerSalesScheme.GetDTO.optional(),

        territory_number: z.string(),

        status:           z.enum(CustomerStatuses),

        sales_rep_name:   z.string(),
    })
}


export namespace CustomerDTO {
    export type Get        = z.infer<typeof CustomerSchema.GetDTO>;
}


export interface CustomerWithDistance extends CustomerDTO.Get {
    distance?: number;
}
