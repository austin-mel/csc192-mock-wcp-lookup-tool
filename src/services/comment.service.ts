import { CommentsDTO, IDs } from "@/types";
import { DemoDataService } from "./demo-data.service";


export namespace CommentsService {
    export async function Create(dto: CommentsDTO.Create) {
        return DemoDataService.createComment(dto);
    }

    export function Get(customer_id: IDs.Customer) {
        return DemoDataService.getComments(customer_id);
    }

    export async function Update(comment_id: IDs.Comment, dto: CommentsDTO.Update) {
        return DemoDataService.updateComment(comment_id, dto);
    }
}
