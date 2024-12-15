<script setup>
const props = defineProps({
  discussionList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggleBookmark'])
</script>

<template>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
    <div v-for="(topic, index) in discussionList" 
         :key="topic.id" 
         :class="[
           'p-6', 
           index !== discussionList.length - 1 ? 'border-b dark:border-gray-700' : ''
         ]">
      <div class="flex items-start space-x-4">
        <div class="flex-1">
          <!-- Tags -->
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span v-if="topic.is_pinned" 
                  class="bg-blue-100 dark:bg-blue-900 text-blue-800 
                         dark:text-blue-200 text-xs px-2 py-1 rounded">
              📌 Pinned
            </span>
            <span v-if="topic.is_featured" 
                  class="bg-red-100 dark:bg-red-900 text-red-800 
                         dark:text-red-200 text-xs px-2 py-1 rounded">
              🔥 Hot
            </span>
            <NuxtLink :to="`/discussion/category/${topic.category.slug}`" class="bg-gray-100 dark:bg-gray-700 text-gray-800 
                       dark:text-gray-200 text-xs px-2 py-1 rounded">
              {{ topic.category.name }}
            </NuxtLink>
            <span class="bg-green-100 dark:bg-green-900 text-green-800 
                       dark:text-green-200 text-xs px-2 py-1 rounded">
              🎯 {{ topic.status }}
            </span>
            <NuxtLink v-if="topic.institution" :to="`/institutes/${topic.institution.slug}`" class="bg-gray-100 dark:bg-gray-700 text-gray-800 
                       dark:text-gray-200 text-xs px-2 py-1 rounded">
              {{ topic.institution.name }}
            </NuxtLink>
            
          </div>

          <!-- Title -->
          <NuxtLink :to="`/discussion/${topic.id}`" class="text-lg font-medium text-gray-900 dark:text-white 
                     hover:text-indigo-600 dark:hover:text-indigo-400 
                     cursor-pointer">
            {{ topic.title }}
          </NuxtLink>
        

          <!-- Meta Info -->
          <div class="mt-2 flex flex-wrap items-center gap-4 text-sm 
                      text-gray-500 dark:text-gray-400">
            <span>👤 {{ topic.author.username || 'Anonymous' }}</span>
            <div class="flex items-center space-x-1">
              <span>💬</span>
              <span>{{ topic.comments_count }} replies</span>
            </div>
            <span>👁️ {{ topic.views }} views</span>
            <span>⏱️ {{ new Date(topic.last_activity * 1000).toLocaleDateString() }}</span>
          </div>

          <!-- Topic Tags -->
          <div class="mt-2 flex flex-wrap items-center gap-2">
            <span v-for="tag in topic.tags" 
                  :key="tag" 
                  class="text-xs text-gray-500 dark:text-gray-400 
                         hover:text-indigo-600 dark:hover:text-indigo-400 
                         cursor-pointer">
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Bookmark Button -->
        <button @click="emit('toggleBookmark', topic.id)" 
                :class="[
                  'text-2xl hover:scale-110 transition-transform',
                  topic.bookmarked ? 'text-indigo-600 dark:text-indigo-400' : 
                                   'text-gray-400 dark:text-gray-500'
                ]">
          {{ topic.bookmarked ? '⭐' : '☆' }}
        </button>
      </div>
    </div>
  </div>
</template> 