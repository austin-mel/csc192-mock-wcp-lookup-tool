import { z } from "zod";
import { IDSchema } from "./ids.dtos";


export namespace CommentsSchema {
    export const CreateDTO = z.object({
        customer_id:  IDSchema.CustomerID,
        
        user_id:      IDSchema.UserID,

        comment_text: z.string(),
    });


    export const GetDTO    = z.object({
        comment_id:   IDSchema.CommentID,

        customer_id:  IDSchema.CustomerID,

        user_id:      IDSchema.UserID,

        comment_text: z.string(),

        created_at:   z.string(),
    });

    export const UpdateDTO = z.object({
        comment_id:   IDSchema.CommentID,
        
        comment_text: z.string(),
    });
}


export namespace CommentsDTO {
    export type Create = z.infer<typeof CommentsSchema.CreateDTO>;
    export type Get    = z.infer<typeof CommentsSchema.GetDTO>;
    export type Update = z.infer<typeof CommentsSchema.UpdateDTO>;
}
