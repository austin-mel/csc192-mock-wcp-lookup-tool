<script setup lang="ts">
import { computed, ref } from "vue";
import parsePhoneNumberFromString from "libphonenumber-js/max";

import { CrossIcon } from "@/assets";
import { useLocaleStore } from "@/stores";
import { BadgeProperties, CommentsDTO, CustomerWithDistance, IDs } from "@/types";
import CardFooter from "./Footer.vue";
import CardBody from "./Body.vue";
import ClientHeader from "./Header.vue";
import { CommentsService } from "@/services";

interface ClientCardProps {
    item: CustomerWithDistance;
}

interface ClientCardEmits {
    (event: "close"): void;
}

// Define props and emits
const { item } = defineProps<ClientCardProps>();
const emit = defineEmits<ClientCardEmits>();

/// TODO(eugene): Re-work API and be able to apply `computed`
const badge_information = ref<BadgeProperties>({
    // account_ownership: item.territory_number ?? '',
    monthly_revenue: item.sales?.month_to_date ?? 0,
    yearly_revenue: item.sales?.year_to_date ?? 0,
});
const { country_code } = useLocaleStore();

const phone_number = computed(() => {
    return parsePhoneNumberFromString(
        item.contacts?.purchasing?.full ||
            item.contacts?.accounts_payable?.full ||
            "",
        country_code,
    );
});

const { data, is_loading, refetch } = CommentsService.Get(item.customer_id);
const comments = computed(() => {
    return data.value ?? [];
})

const handleEditComment = async (
    comment_id: IDs.Comment,
    dto: CommentsDTO.Update,
) => {
    try {
        await CommentsService.Update(comment_id, dto);
        //Refresh comments after update
        await refetch();
    } catch (err) {
        console.error("Failed to update comment:", err);
    }
};

//Handler for adding a new comment

const handleAddComment = async (dto: CommentsDTO.Create) => {
    try {
        await CommentsService.Create({
            comment_text: dto.comment_text,
            customer_id: item.customer_id || "cust001",
            user_id: 1,
        });

        //Refresh comments after adding
        await refetch();
    } catch (err) {
        console.error("Failed to add comment:", err);
    }
};
</script>

<template>
    <div
        class="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-gray-700/80"
        @click="emit('close')"
        id="clientcard"
    >
        <div
            class="relative max-h-[80vh] w-11/12 max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800"
            @click.stop
        >
            <div class="flex justify-end pb-4">
                <button
                    type="button"
                    class="flex items-center justify-end rounded-tr-lg bg-white pt-2 pr-2 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:absolute sm:top-0 sm:right-0 sm:block sm:pt-4 sm:pr-4 dark:bg-gray-800"
                    @click="emit('close')"
                >
                    <CrossIcon class="h-7 w-7" />
                </button>
            </div>

            <ClientHeader
                :company_properties="badge_information"
                :company_name="item.customer_name ?? 'Unknown'"
                :client_status="item.status"
            />

            <CardBody
                :address="
                    item.address ?? {
                        address_line_1: 'No address provided',
                        address_line_2: '',
                        address_line_3: '',
                        city: '',
                        state: '',
                        postal_code: '',
                    }
                "
                :comments="comments"
                :isLoading="is_loading"
                :email="''"
                :phone_number="phone_number"
                :distance="item.distance ?? 0"
                :account_number="item.customer_id ?? 'N/A'"
                @update:comments=""
                @add-comment="handleAddComment"
                @edit-comment="handleEditComment"
            />

            <CardFooter
                :email="item.sales_rep_name ?? 'No email provided'"
                :address="item.address"
                :phone_number="phone_number"
            />
        </div>
    </div>
</template>
