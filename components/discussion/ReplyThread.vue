<template>
  <div class="p-4 sm:p-6" :style="{ marginLeft: `${depth * 2}rem` }">
    <div class="flex justify-between">
      <div class="flex items-start space-x-3">
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-2">
            <span class="font-medium text-gray-900 dark:text-white">
              {{ reply.author.username || `${reply.author.first_name} ${reply.author.last_name}` || 'Anonymous' }}
            </span>
            <span class="text-sm text-gray-500">
              {{ formatDate(reply.created_on * 1000) }}
            </span>
            <span v-if="reply.edited" class="text-sm text-gray-500">(edited)</span>
            <span v-if="reply.is_best_answer" 
                  class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              Best Answer
            </span>
          </div>
          <div class="prose dark:prose-invert">
            {{ reply.content }}
          </div>
          <div class="mt-3 flex items-center space-x-4 text-sm">
            <button @click="toggleUpvote(reply.id)" 
                    class="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
              <span>👍 {{ reply.upvotes }}</span>
            </button>
            <button @click="toggleDownvote(reply.id)" 
                    class="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
              <span>👎 {{ reply.downvotes }}</span>
            </button>
            <button @click="handleReply(reply.id)"
                    class="text-indigo-600 hover:text-indigo-700">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Nested Replies -->
    <div v-if="reply.replies && reply.replies.length > 0" class="mt-4">
      <div v-for="nestedReply in reply.replies" 
           :key="nestedReply.id">
        <ReplyThread
          :reply="nestedReply"
          :depth="depth + 1"
          :toggle-upvote="toggleUpvote"
          :handle-reply="handleReply"
          :toggle-thread="toggleThread"
          :expanded-threads="expandedThreads"
          :format-date="formatDate"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reply: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  },
  toggleUpvote: {
    type: Function,
    required: true
  },
  handleReply: {
    type: Function,
    required: true
  },
  toggleThread: {
    type: Function,
    required: true
  },
  expandedThreads: {
    type: Object,
    required: true
  },
  formatDate: {
    type: Function,
    required: true
  }
})
</script> 