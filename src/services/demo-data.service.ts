import { ref } from "vue";

import {
    createDemoToken,
    demoComments,
    demoCustomers,
    demoGeolocation,
    DEMO_CREDENTIALS,
} from "@/data/demo-data";
import { AuthDTO, CommentsDTO, GeolocationDTO, IDs, CustomerDTO } from "@/types";

let comments = [...demoComments];

export namespace DemoDataService {
    export async function login(dto: AuthDTO.LoginRequest): Promise<AuthDTO.LoginResponse> {
        if (
            dto.email.trim().toLowerCase() !== DEMO_CREDENTIALS.email ||
            dto.password !== DEMO_CREDENTIALS.password
        ) {
            return { token: "" };
        }

        return { token: createDemoToken() };
    }

    export function getCustomers(): CustomerDTO.Get[] {
        return demoCustomers.map((customer) => ({ ...customer }));
    }

    export function getGeolocation(): GeolocationDTO.Get {
        return { ...demoGeolocation };
    }

    export async function createComment(dto: CommentsDTO.Create) {
        comments = [
            {
                comment_id:   comments.length + 1,
                customer_id:  dto.customer_id,
                user_id:      dto.user_id,
                comment_text: dto.comment_text,
                created_at:   new Date().toISOString(),
            },
            ...comments,
        ];
    }

    export function getComments(customer_id: IDs.Customer) {
        const data = ref(
            comments.filter((comment) => comment.customer_id === customer_id),
        );

        return {
            data,
            error:      ref<string | null>(null),
            is_loading: ref(false),
            refetch:    async () => {
                data.value = comments.filter((comment) => comment.customer_id === customer_id);
            },
        };
    }

    export async function updateComment(comment_id: IDs.Comment, dto: CommentsDTO.Update) {
        comments = comments.map((comment) =>
            comment.comment_id === comment_id
                ? { ...comment, comment_text: dto.comment_text }
                : comment,
        );
    }
}
