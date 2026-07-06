import { z } from "zod";
import { UserRoles } from "../user-info.interface";


export namespace AuthSchema {
    export const LoginRequestDTO = z.object({
        email:        z.string().email(),

        password:     z.string(),
    });

    export const LoginResponseDTO = z.object({
        token:        z.string(),
    })

    export const JwtClaimsDTO = z.object({
        sub:              z.string(),

        first_name:       z.string(),

        last_name:        z.string(),

        email:            z.string().email(),

        role:             z.enum(UserRoles),

        phone_number:     z.string(),

        date_of_hire:     z.string(),

        territory_number: z.string(),

        iat:              z.number(),

        exp:              z.number(),
    });
}


export namespace AuthDTO {
    export type LoginRequest  = z.infer<typeof AuthSchema.LoginRequestDTO>;
    export type LoginResponse = z.infer<typeof AuthSchema.LoginResponseDTO>;
    export type JwtClaims     = z.infer<typeof AuthSchema.JwtClaimsDTO>;
}
