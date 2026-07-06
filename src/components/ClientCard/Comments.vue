<template>
    <ul role="list" class="grid gap-2">
        <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <h3 class="font-bold">Comments</h3>
                <div class="ml-2">
                    <select 
                        v-model="sortOrder" 
                        @change="handleSortChange"
                        class="text-xs px-2 py-1 bg-gray-200 rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        id="sortcomments"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>
            
            <div v-if="totalPages > 1" class="flex item-center space-x-2 text-sm">
                <button 
                    @click="previousPage" 
                    :disabled="currentPage === 1"
                    class="disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1 text-xs font-medium text-black bg-gray-200 rounded hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    id="prevCommentPage"
                >
                    Previous
                </button>
                <span class="text-gray-600 dark:text-gray-300">
                    {{ currentPage }} / {{ totalPages }}
                </span>
                <button 
                    @click="nextPage" 
                    :disabled="currentPage >= totalPages"
                    class="disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1 text-xs font-medium text-black bg-gray-200 rounded hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    id="nextCommentPage"
                >
                    Next
                </button>
            </div>
        </div>

        <!-- Loading indicator for comments-->
         <li v-if="isLoading" class="p-3 text-center text-sm text-gray-500 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300">
            Loading comments...
         </li>

        <li
            v-for="comment in paginatedComments"
            :key="comment.comment_id"
            class="flex flex-wrap items-center justify-between p-3 bg-gray-200 rounded-md gap-x-6 gap-y-4 dark:bg-gray-700 sm:flex-nowrap"
            id="comments"
            >
            <div class="w-full">
                <div
                    class="flex items-center text-sm text-gray-500 gap-x-2 dark:text-gray-200"
                >
                    <UserIcon />
                    <p>
                        <a href="#" class="hover:underline">
                            <!-- TODO(eugene): Replace with user's full name -->
                            User: {{ comment.user_id }}
                        </a>
                    </p>
                    <SeparatorCircleIcon />
                    <p>
                        <time :datetime="comment.created_at">
                            {{ dayjs(comment.created_at).fromNow() }}
                        </time>
                    </p>
                </div>

                <!-- Display mode -->
                <p
                    v-if="editingCommentId !== comment.comment_id"
                    class="text-sm text-gray-900 dark:text-gray-100 mt-2"
                >
                    {{ comment.comment_text }}
                </p>
                
                
            </div>
        </li>

        <!-- If no comments to show on this page -->
        <li v-if="paginatedComments.length === 0" class="p-3 text-center text-sm text-gray-500 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300">
            No comments to display.
        </li>
        
        <!-- Add new comment section -->
        <li class="flex flex-wrap p-3 bg-gray-200 rounded-md gap-y-2 dark:bg-gray-700">
            <textarea 
                v-model="newCommentText" 
                placeholder="Add a new comment..."
                class="w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                rows="2"
                id="commentInput"
            ></textarea>
            <button 
                @click="addComment"
                :disabled="!newCommentText.trim() || isAddingComment"
                class="px-3 py-1 text-xs font-medium text-black bg-[#FFE100] rounded hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 mt-2"
                id="addCommentBtn"
            >
                {{ isAddingComment ? 'Adding...' : 'Add Comment' }}
            </button>
        </li>
    </ul>
</template>


<script setup lang="ts">
import {ref, computed, watch} from 'vue';
import { dayjs } from "@/plugins";
import { SeparatorCircleIcon, UserIcon } from "@/assets";
import { CommentsProps } from "./Comments.props";
import { Comment } from '@/types';

const props = defineProps<CommentsProps>();

// Define emits for comment operations
const emit = defineEmits(['update:comments', 'addComment']);

// State for editing
const editingCommentId = ref<number | null>(null);
const newCommentText = ref('');
const isAddingComment = ref(false);

// Add sort order state - default to newest first
const sortOrder = ref('newest');

//Comments pagination
const commentsPerPage = 4;
const currentPage = ref(1);

//Get current user ID from authentication
//TODO This should be replaced with the acutal auth mechanism

const getCurrentUserId = () => {
    // Use the auth store or service to get the current user ID
    //It only works with user 1,2 or 3.
    return 1; // TODO replace with actual implementation
 
};



// Sorted comments based on sort order
const sortedComments = computed(() => {
    // Create a copy of the comments to avoid mutating props
    const commentsCopy = [...props.comments];
    
    // Sort by created_at timestamp
    return commentsCopy.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        
        // For newest first, return b - a (descending)
        // For oldest first, return a - b (ascending)
        return sortOrder.value === 'newest' ? dateB - dateA : dateA - dateB;
    });
});

//Calculate total pages
const totalPages = computed(() => {
    return Math.ceil(sortedComments.value.length / commentsPerPage);
});

// Get paginated comments
const paginatedComments = computed(() => {
    const start = (currentPage.value - 1) * commentsPerPage;
    const end = start + commentsPerPage;
    return sortedComments.value.slice(start, end);
});

// Watch for sort order changes and reset to page 1
watch(sortOrder, () => {
    currentPage.value = 1;
});

// Handle sort change
const handleSortChange = () => {
    // Reset to page 1 when changing sort order
    currentPage.value = 1;
};

// Navigate to previous page
const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Navigate to next page
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

// Add a new comment
const addComment = async () => {
    if (!newCommentText.value.trim() || isAddingComment.value) {
        return;
    }
    
    isAddingComment.value = true;
    
    try {
        // Get customer ID from the first comment or fallback to a default
        const customerId = props.comments[0]?.customer_id || "UNKNOWN";
        
        // Create a new comment object with current timestamp as ID (will be replaced by backend)
        const newComment: Comment = {
            comment_id: Date.now(), // Temporary ID, will be replaced by backend
            customer_id: customerId,
            user_id: getCurrentUserId(),
            comment_text: newCommentText.value,
            created_at: new Date().toISOString()
        };
        
        // Emit the addComment event for parent component to handle API call
        emit('addComment', newComment);
        
        // Add to local state optimistically
        const updatedComments = [...props.comments, newComment];
        emit('update:comments', updatedComments);
        
        // Clear the input
        newCommentText.value = '';
        
        // If we're showing newest first, make sure we're on page 1 to see the new comment
        if (sortOrder.value === 'newest') {
            currentPage.value = 1;
        } else {
            // If sorting by oldest first, navigate to the last page to see the new comment
            currentPage.value = Math.ceil(updatedComments.length / commentsPerPage);
        }
    } catch (error) {
        console.error('Error adding comment:', error);
    } finally {
        isAddingComment.value = false;
    }
};
</script>