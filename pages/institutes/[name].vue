<script setup>
import { useUserStore } from '~/store/userStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const userStore = useUserStore();
const route = useRoute()
const name = ref(route.params.name)
const data = ref("");
const paragraphs = ref("");
const details = ref({})
const showContributeModal = ref(false)
const instituteDiscussions = ref([])
const loading = ref(false)
const { $dayjs } = useNuxtApp()

// Format date helper function
const formatDate = (date) => {
  return $dayjs(date).fromNow();
};

const ssrListInstitute = async () => {
  try {
    const { data, pending, error } = await useSsrfetch(`institutes/institutions/public/${name.value}/`, {
      method: 'GET'
    });
    
    if (!pending.value && !error.value && data.value?.data) {
      details.value = data.value.data;
      paragraphs.value = details.value.description?.split("\n\n") || [];
    }
  } catch (err) {
    console.error('Error fetching institute details:', err);
  }
};

const fetchDiscussions = async () => {
  loading.value = true;
  try {
    const { data, pending, error } = await useSsrfetch('discussion/topics/', {
      method: 'GET',
      query: {
        institute_id: details.value?.id,
        limit: '5'
      }
    });
    
    if (!pending.value && !error.value && data.value?.data) {
      instituteDiscussions.value = data.value.data.results || [];
      console.log('Discussions:', instituteDiscussions.value);
    }
  } catch (error) {
    console.error('Error fetching discussions:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await ssrListInstitute();
  if (details.value?.id) {
    await fetchDiscussions();
  }
});

useServerSeoMeta({
  title: () => 'Intstu | ' + details.value.name,
  description: () => details.value.short_description,
  image: () => details.value.image,
  ogTitle: () => 'Intstu | ' + details.value.name,
  ogDescription: () => details.value.short_description,
  ogImage: () => details.value.image,
  twitterTitle: () => 'Intstu | ' + details.value.name,
  twitterDescription: () => details.value.short_description,
  twitterImage: () => details.value.image,
})
</script>

<template>
  <section class="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div class="py-12 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
      <!-- Hero Section -->
      <div class="max-w-screen-lg mx-auto text-center mb-12">
        <h1 class="mb-6 text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
          {{ details.name }}
        </h1>
        
        <div class="flex justify-center items-center gap-4 mb-8">
          <a :href="details.website" target="_blank"
            class="inline-flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Visit Website
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          <button @click="showContributeModal = true"
            class="inline-flex items-center px-6 py-3 font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:text-blue-400 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
            Contribute Info
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <p class="text-lg text-gray-600 dark:text-gray-300">{{ details.address }}</p>
      </div>

      <!-- Content Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Description -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="prose dark:prose-invert max-w-none">
              <div v-for="(para, index) in paragraphs" :key="index" class="mb-6">
                <p class="text-gray-600 dark:text-gray-300">{{ para }}</p>
              </div>
            </div>
          </div>

          <!-- Discussions Section -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <h3 class="text-lg font-semibold">
                  <span class="text-indigo-600 dark:text-indigo-400">Campus</span> Conversations
                </h3>
                <span class="px-2 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full">
                  {{ instituteDiscussions.length }}
                </span>
              </div>
              <NuxtLink :to="localePath(`/discussion/create-discussion?institute=${name}`)"
                        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full text-sm transition-all transform hover:scale-105">
                <i class="pi pi-plus-circle"></i>
                <span>Start Discussion</span>
              </NuxtLink>
            </div>

            <!-- Discussions List -->
            <div v-if="loading" class="text-center py-8">
              <i class="pi pi-spin pi-spinner text-2xl text-indigo-600"></i>
            </div>

            <div v-else-if="instituteDiscussions.length" class="space-y-4">
              <div v-for="discussion in instituteDiscussions" :key="discussion.id"
                   class="group p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all">
                <div class="flex items-start gap-3">
                  <!-- Author Avatar -->
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
                    {{ discussion.author?.username?.[0]?.toUpperCase() || '?' }}
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1">
                    <NuxtLink :to="localePath(`/discussion/${discussion.slug}`)"
                             class="text-gray-900 dark:text-white font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {{ discussion.title }}
                    </NuxtLink>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                      <span class="flex items-center gap-1">
                        <i class="pi pi-user text-xs"></i>
                        {{ discussion.author?.username || 'Anonymous' }}
                      </span>
                      <span class="flex items-center gap-1">
                        <i class="pi pi-comments text-xs"></i>
                        {{ discussion.replies?.length || 0 }} replies
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

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <button @click="discussion.bookmarked = !discussion.bookmarked" 
                            class="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
                      <i :class="['pi text-sm', discussion.bookmarked ? 'pi-bookmark-fill text-indigo-600' : 'pi-bookmark']"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- View All Link -->
              <div class="text-center pt-4">
                <NuxtLink :to="localePath(`/discussion?institute=${name}`)"
                          class="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  <span>View all discussions</span>
                  <i class="pi pi-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center">
                <i class="pi pi-comments text-2xl text-indigo-600 dark:text-indigo-400"></i>
              </div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No discussions yet
              </h4>
              <p class="text-gray-500 dark:text-gray-400 mb-4">
                Be the first to start a conversation about {{ details.name }}
              </p>
              <NuxtLink :to="localePath(`/discussion/create-discussion?institute=${name}`)"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm transition-all transform hover:scale-105">
                <i class="pi pi-plus-circle"></i>
                <span>Start the First Discussion</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Community Stats -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Community Insights</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300">Student Reviews</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">24</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300">Contributors</span>
                <span class="font-semibold text-blue-600 dark:text-blue-400">12</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-300">Last Updated</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">2 days ago</span>
              </div>
            </div>
          </div>

          <!-- Share Section -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Share</h3>
            <div class="grid grid-cols-3 gap-2">
              <SocialShare v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'reddit', 'whatsapp']"
                :key="network" :network="network" :title="details.name + ' in Intstu'" :styled="true" :label="false"
                class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors" />
            </div>
          </div>

          <!-- Call to Action -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <h3 class="text-lg font-semibold mb-3">Know this university better?</h3>
            <p class="mb-4 text-blue-100">Help other students by sharing your experience and knowledge!</p>
            <button @click="showContributeModal = true"
              class="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Contribute Now
            </button>
          </div>

          <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white">
            <h3 class="text-sm font-semibold mb-1">University Representative?</h3>
            <p class="text-xs text-purple-100 mb-2">Take control of your institution's page and reach more international students.</p>
            <NuxtLink :to="'/claim-institute-page?institution_name=' + details.name"
              class="w-full px-3 py-1.5 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              Claim This Page
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>