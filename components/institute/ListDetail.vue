<template>
  <div class="rounded-md hover:shadow-lg transition-shadow duration-300">
    <div class="p-3 flex w-full">
      <a class="w-2/3 font-bold text-lg mb-1 text-blue-600 dark:text-blue-300"
        :href="localePath('/institutes/' + item.slug)">{{ item.name }}</a>
      <div class="w-1/3 flex justify-end">
        <button @click="handleAddToList()" 
                class="bg-blue-400 h-8 hover:bg-blue-600 text-white px-2 rounded-md text-sm flex items-center">
          <PlusCircleIcon class="h-4 w-4" />
          <span class="ml-1">Shortlist</span>
        </button>
      </div>
    </div>
    
    <p class="text-sm px-3 pb-2">{{ item.short_description }}...</p>

    <!-- Compact Institute Discussions Section -->
    <div class="mt-2 p-3 border-t border-gray-200 dark:border-gray-700">
      <!-- Header Row -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <h3 class="text-base font-semibold">
            <span class="text-indigo-600 dark:text-indigo-400">Campus</span> Conversations
          </h3>
          <span class="px-1.5 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full">
            {{ instituteDiscussions.length }}
          </span>
        </div>
        <NuxtLink :to="localePath(`/discussion/create-discussion?institute=${item.name}`)"
                  class="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full text-xs transition-all transform hover:scale-105">
          <i class="pi pi-plus-circle text-xs"></i>
          <span>New</span>
        </NuxtLink>
      </div>

      <!-- Discussion List -->
      <div v-if="instituteDiscussions.length" class="space-y-2">
        <div v-for="discussion in instituteDiscussions.slice(0, 3)" :key="discussion.id"
             class="group p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <!-- Icon -->
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
              <i class="pi pi-comments text-sm text-indigo-600 dark:text-indigo-400"></i>
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <a :href="localePath(`/discussion/${discussion.slug}`)" 
                 class="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {{ discussion.title }}
              </a>
              <div class="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                <span class="flex items-center gap-1">
                  <i class="pi pi-reply text-xs"></i>
                  {{ discussion.replies }}
                </span>
                <span class="flex items-center gap-1">
                  <i class="pi pi-clock text-xs"></i>
                  {{ formatDate(discussion.created_on) }}
                </span>
                <span v-if="discussion.is_hot" 
                      class="flex items-center gap-1 text-orange-500">
                  <i class="pi pi-fire text-xs"></i>
                  Hot
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Link -->
        <div v-if="instituteDiscussions.length > 3" 
             class="text-center mt-2">
          <NuxtLink :to="localePath(`/discussion?institute=${item.slug}`)"
                    class="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
            <span>View all {{ instituteDiscussions.length }}</span>
            <i class="pi pi-arrow-right text-xs"></i>
          </NuxtLink>
        </div>
      </div>

      <!-- Empty State - More Compact -->
      <div v-else class="text-center py-4">
        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center">
          <i class="pi pi-comments text-lg text-indigo-600 dark:text-indigo-400"></i>
        </div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1">
          Start the first discussion
        </h4>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Be the first to start a conversation
        </p>
        <NuxtLink :to="localePath(`/discussion/create-discussion?institute=${item.slug}`)"
                  class="inline-flex items-center gap-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs transition-all transform hover:scale-105">
          <i class="pi pi-plus-circle text-xs"></i>
          <span>Start Discussion</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['openLoginModal']);
const { $dayjs } = useNuxtApp();

import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from "~/store/userStore"
const userStore = useUserStore()

// Fetch discussions related to this institute
const instituteDiscussions = ref([])

const formatDate = (timestamp) => {
  return $dayjs(timestamp).fromNow()
}

// Fetch discussions when component mounts
onMounted(async () => {
  try {
    const { data } = await useSsrfetch(`discussion/topics/?institute=${props.item.id}`, {
      method: 'GET',
    })
    instituteDiscussions.value = data.value?.data?.results || []
  } catch (error) {
    console.error('Error fetching institute discussions:', error)
  }
})

const handleAddToList = () => {
  if (userStore.isLoggedIn) {
    console.log('Add to list')
  } else {
    emit('openLoginModal')
  }
}

const localePath = useLocalePath();
</script>