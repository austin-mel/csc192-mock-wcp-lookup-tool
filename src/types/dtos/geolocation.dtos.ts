import { z } from "zod";


export namespace GeolocationScheme {
    export const GetDTO = z.object({
        latitude:  z.number().optional(),

        longitude: z.number().optional(),
    });
}


export namespace GeolocationDTO {
    export type Get = z.infer<typeof GeolocationScheme.GetDTO>;
}
