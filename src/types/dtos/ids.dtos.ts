import { z } from "zod";


export namespace IDSchema {
    export const CommentID  = z.number();
    export const CustomerID = z.string();
    export const UserID     = z.number();
}


export namespace IDs {
    export type Comment  = z.infer<typeof IDSchema.CommentID>;
    export type Customer = z.infer<typeof IDSchema.CustomerID>;
    export type User     = z.infer<typeof IDSchema.UserID>;
}
