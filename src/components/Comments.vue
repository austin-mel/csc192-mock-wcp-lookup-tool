<template>
    <div>  
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Comments</h3>
        <p class="text-sm text-gray-500">Demo notes for synthetic accounts</p>

        <div v-for="comment in comments" :key="comment.comment_id" class="p-4 border-b comment-item">
            <div class="flex items-center mb-2">
                <div class="flex items-center justify-center w-8 h-8 mr-3 bg-gray-300 rounded-full">
                    <span class="text-white">U</span>
                </div>
                <span class="font-medium text-gray-800 dark:text-white">{{ comment.user_id }}</span>
            </div>

            <p class="text-gray-800 dark:text-white">{{ comment.comment_text }}</p>
        
            <span class="text-xs text-gray-400">Posted on: {{ formatDate(comment.created_at) }}</span>
        </div>
    </div>
  </template>
  
<script lang="ts">
import { ref } from 'vue';
import { Comment } from "@/types";

export default {
  setup() {
    const comments = ref<Comment[]>([
      {
        comment_id: 1,
        customer_id: "ACCT-1001",
        user_id: 101,
        comment_text: "Scheduled a demo follow-up.",
        created_at: "2025-02-12T10:30:00Z"
      },
      {
        comment_id: 2,
        customer_id: "ACCT-1002",
        user_id: 102,
        comment_text: "Requested a quarterly planning note.",
        created_at: "2025-02-10T14:15:00Z"
      },
    ]);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    return {
      comments,
      formatDate
    };
  }
};
</script>
