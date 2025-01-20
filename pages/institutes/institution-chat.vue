<script setup>
const messages = ref([])
const newMessage = ref('')
const loading = ref(false)
const error = ref(null)
const messagesContainer = ref(null)
const pendingRequest = ref(false)
const currentQuestion = ref('')

// Scroll to bottom when messages change
watch(() => messages.value.length, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})

const sendMessage = async () => {
  if (!newMessage.value.trim() || pendingRequest.value) return
  
  const userMessage = newMessage.value
  const messageId = Date.now() // Unique ID for this message pair
  
  // Store current question for context
  currentQuestion.value = userMessage
  
  messages.value.push({
    id: messageId,
    role: 'user',
    content: userMessage
  })
  
  newMessage.value = ''
  loading.value = true
  error.value = null
  pendingRequest.value = true

  try {
    const { data } = await useAPIFetch('institutes/rag/institute/chat/', {
      method: 'POST',
      body: {
        question: userMessage,
        // Include previous messages for context but filter out error messages
        messages: messages.value
          .filter(msg => !msg.error)
          .slice(-4) // Only keep last 4 messages for context
          .map(msg => ({
            role: msg.role,
            content: msg.content,
            question: msg.role === 'user' ? msg.content : currentQuestion.value // Include original question
          }))
      }
    })

    if (data.value?.success) {
      // Add response immediately after the user message
      messages.value.push({
        id: messageId,
        role: 'assistant',
        content: data.value.data.answer,
        sources: data.value.data.sources,
        question: currentQuestion.value // Store question that generated this answer
      })
    } else {
      // Add error message immediately after
      messages.value.push({
        id: messageId,
        role: 'assistant',
        content: 'Failed to get response. Please try again.',
        error: true
      })
      error.value = 'Failed to get response. Please try again.'
    }
  } catch (e) {
    // Add error message immediately after
    messages.value.push({
      id: messageId,
      role: 'assistant', 
      content: 'Failed to get response. Please try again.',
      error: true
    })
    error.value = 'Failed to get response. Please try again.'
    console.error(e)
  } finally {
    loading.value = false
    pendingRequest.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <!-- Messages Container -->
      <div class="h-[600px] overflow-y-auto p-6 space-y-4" ref="messagesContainer">
        <template v-if="messages.length">
          <div v-for="(message, index) in messages" :key="message.id"
               :class="[
                 'max-w-[80%] rounded-lg p-4',
                 message.role === 'user' 
                   ? 'bg-blue-100 dark:bg-blue-900 ml-auto' 
                   : message.error
                     ? 'bg-red-100 dark:bg-red-900'
                     : 'bg-gray-100 dark:bg-gray-700'
               ]">
            <p :class="[
                 'text-gray-800 dark:text-gray-200',
                 message.error && 'text-red-600 dark:text-red-400'
               ]">
              {{ message.content }}
            </p>
            
            <!-- Sources for assistant messages -->
            <div v-if="message.role === 'assistant' && message.sources?.length"
                 class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Sources:</p>
              <div v-for="(source, idx) in message.sources" :key="idx"
                   class="text-sm">
                <a :href="source.link" 
                   target="_blank"
                   class="text-blue-600 dark:text-blue-400 hover:underline">
                  {{ source.institution }}
                </a>
              </div>
            </div>
          </div>
        </template>
        
        <div v-else class="text-center text-gray-500 dark:text-gray-400">
          Start a conversation by asking a question about educational institutions
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        <!-- Error message -->
        <div v-if="error" class="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 p-3 rounded-lg text-center">
          {{ error }}
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-4">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Ask a question..."
            class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            :disabled="loading || pendingRequest"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
