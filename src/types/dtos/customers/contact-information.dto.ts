import { z } from "zod";


export namespace CustomerContactInformationScheme {
    export const GetDTO = z.object({
        area_code:      z.string().optional(),

        phone_number:   z.string().optional(),

        extension:      z.string().optional(),

        full:           z.string().optional(),

        representative: z.string().optional(),
    });
}


export namespace CustomerContactInformationDTO {
    export type Get = z.infer<typeof CustomerContactInformationScheme.GetDTO>;
}
