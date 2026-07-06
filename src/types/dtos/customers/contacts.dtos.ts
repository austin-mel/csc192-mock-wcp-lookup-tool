import { z } from "zod";
import { CustomerContactInformationScheme } from './contact-information.dto';


export namespace CustomerContactsScheme {
    export const GetDTO = z.object({
        purchasing:       CustomerContactInformationScheme.GetDTO.optional(),

        accounts_payable: CustomerContactInformationScheme.GetDTO.optional(),

        fax_number:       z.string().optional(),
    });
}


export namespace CustomerContactsDTO {
    export type Get = z.infer<typeof CustomerContactsScheme.GetDTO>;
}
