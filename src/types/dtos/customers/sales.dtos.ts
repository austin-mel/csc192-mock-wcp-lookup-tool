import { z } from "zod";


export namespace CustomerSalesScheme {
    export const GetDTO = z.object({
        month_to_date: z.number().optional(),

        year_to_date:  z.number().optional(),
    })
}


export namespace CustomerSalesDTO {
    export type Get = z.infer<typeof CustomerSalesScheme.GetDTO>;
}
