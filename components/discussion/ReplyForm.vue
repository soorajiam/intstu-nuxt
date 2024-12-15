<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/store/userStore'

const props = defineProps({
  discussionId: {
    type: [Number, String],
    required: true
  },
  parentId: {
    type: [Number, String],
    default: null
  },
  onSuccess: {
    type: Function,
    default: () => {}
  },
  onCancel: {
    type: Function,
    default: () => {}
  }
})

const userStore = useUserStore()
const replyContent = ref('')
const isSubmitting = ref(false)
const error = ref(null)

const submitReply = async () => {
  if (!replyContent.value.trim()) return
  
  isSubmitting.value = true
  error.value = null
  
  try {
    const { data, error: apiError } = await useSsrfetch('discussion/comments', {
      method: 'POST',
      body: JSON.stringify({
        topic: props.discussionId,
        content: replyContent.value,
        parent: props.parentId
      })
    })
    
    if (apiError.value) throw apiError.value
    
    replyContent.value = ''
    props.onSuccess(data.value)
  } catch (err) {
    error.value = err.message || 'Failed to post reply'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
    <textarea
      v-model="replyContent"
      rows="4"
      placeholder="What are your thoughts?"
      :disabled="isSubmitting"
      class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 
             dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 
             focus:ring-indigo-500 focus:border-transparent"
    ></textarea>
    
    <div v-if="error" class="mt-2 text-red-600 dark:text-red-400 text-sm">
      {{ error }}
    </div>
    
    <div class="flex justify-end space-x-4 mt-4">
      <button 
        @click="onCancel"
        :disabled="isSubmitting"
        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 
               dark:hover:text-white disabled:opacity-50"
      >
        Cancel
      </button>
      <button 
        @click="submitReply"
        :disabled="isSubmitting"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
               transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600"
      >
        {{ isSubmitting ? 'Posting...' : 'Post Reply' }}
      </button>
    </div>
  </div>
</template> 