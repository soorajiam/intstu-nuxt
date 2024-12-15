<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/store/userStore'
import { useThemeStore } from '~/store/themeStore'
import ReplyThread from '~/components/discussion/ReplyThread.vue'
import ReplyForm from '~/components/discussion/ReplyForm.vue'
const userStore = useUserStore()
const themeStore = useThemeStore()

const route = useRoute()
const isDarkMode = ref(false)
const showReplyForm = ref(false)
const replyToId = ref(null)
const expandedThreads = ref(new Set())
const showSidebar = ref(false) // For mobile sidebar toggle
const showFullContent = ref(false)

// Marketing engagement features
const relatedDiscussions = ref([
  {
    id: 'r1',
    title: '5 Game-Changing Productivity Apps for 2024',
    engagement: '89% found this helpful',
    replies: 156
  },
  {
    id: 'r2', 
    title: 'How I Increased My Productivity by 3x Using Time Blocking',
    engagement: '92% success rate',
    replies: 234
  },
  {
    id: 'r3',
    title: 'The Science Behind Productivity: Research-Backed Methods',
    engagement: '1.2k shares',
    replies: 178
  }
])

const engagementStats = ref({
  totalParticipants: 342,
  activeNow: 28,
  averageResponse: '5 mins',
  qualityScore: '4.8/5'
})

const expertInsights = ref([
  {
    expert: 'Dr. Sarah Miller',
    title: 'Productivity Researcher',
    insight: 'The discussion touches on key productivity principles backed by research',
    rating: 4.9
  },
  {
    expert: 'James Chen',
    title: 'Time Management Coach',
    insight: 'Great practical applications being shared here',
    rating: 4.7
  }
])

const achievements = ref([
  {
    id: 'trending',
    icon: '🔥',
    label: 'Trending Discussion',
    achieved: true
  },
  {
    id: 'quality',
    icon: '⭐',
    label: 'Quality Responses',
    achieved: true
  },
  {
    id: 'engagement',
    icon: '🎯',
    label: 'High Engagement',
    achieved: false
  }
])

// Gamification features
const userContributionScore = ref(0)
const showRewardAnimation = ref(false)

const awardPoints = (action) => {
  const points = {
    reply: 10,
    upvote: 2,
    quality: 15
  }
  userContributionScore.value += points[action]
  showRewardAnimation.value = true
  setTimeout(() => {
    showRewardAnimation.value = false
  }, 2000)
}

// Original discussion functionality remains the same
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const discussion = ref({})
// Discussion data with enhanced engagement metrics
const getDiscussion = async () => {
  try {
    const { data, error } = await useSsrfetch(`discussion/topics/${route.params.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    if (error.value) {
      console.error('Error fetching discussion:', error.value)
      return
    }
    
    discussion.value = data.value.data
  } catch (err) {
    console.error('Error fetching discussion:', err)
  }
}
getDiscussion()

// Enhanced replies with engagement indicators
const replies = ref([
  {
    id: 1,
    content: "The 2-minute rule has been a game-changer for me. If something takes less than 2 minutes, do it immediately instead of adding it to your todo list.",
    author: "Alex Kumar",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    createdAt: "2024-01-15T11:00:00Z",
    upvotes: 156,
    isUpvoted: false,
    helpfulCount: 89,
    expertVerified: true,
    threads: [
      {
        id: 11,
        content: "This is brilliant! I've started implementing this and it really helps prevent small tasks from piling up.",
        author: "Maria Garcia",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        createdAt: "2024-01-15T11:30:00Z",
        upvotes: 45,
        isUpvoted: false,
        helpfulCount: 23,
        threads: [{
        id: 11,
        content: "This is brilliant! I've started implementing this and it really helps prevent small tasks from piling up.",
        author: "Maria Garcia",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        createdAt: "2024-01-15T11:30:00Z",
        upvotes: 45,
        isUpvoted: false,
        helpfulCount: 23,
        threads: []
      },
      {
        id: 11,
        content: "This is brilliant! I've started implementing this and it really helps prevent small tasks from piling up.",
        author: "Maria Garcia",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        createdAt: "2024-01-15T11:30:00Z",
        upvotes: 45,
        isUpvoted: false,
        helpfulCount: 23,
        threads: []
      }
    ]
      }
    ]
  },
  {
    id: 2,
    content: "I've found that using a digital garden (like Obsidian or Notion) to organize my thoughts and projects has dramatically improved my productivity. It helps me connect ideas and maintain context across different projects.",
    author: "James Wilson",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    createdAt: "2024-01-15T12:15:00Z",
    upvotes: 89,
    isUpvoted: false,
    helpfulCount: 67,
    expertVerified: true,
    threads: []
  }
])

// Enhanced interaction handlers
const toggleThread = (replyId) => {
  if (!replyId) return
  
  if (expandedThreads.value.has(replyId)) {
    expandedThreads.value.delete(replyId)
  } else {
    expandedThreads.value.add(replyId)
    awardPoints('engagement')
  }
}

const handleReply = (parentId = null) => {
  replyToId.value = parentId
  showReplyForm.value = true
}

const handleReplySuccess = (newReply) => {
  // Add the new reply to the discussion
  if (!discussion.value.latest_comments) {
    discussion.value.latest_comments = []
  }
  
  if (replyToId.value) {
    const findAndAddReply = (repliesArray) => {
      if (!repliesArray) return false
      
      for (let reply of repliesArray) {
        if (reply.id === replyToId.value) {
          if (!reply.replies) reply.replies = []
          reply.replies.push(newReply)
          expandedThreads.value.add(reply.id)
          awardPoints('reply')
          return true
        }
        if (reply.replies?.length && findAndAddReply(reply.replies)) {
          return true
        }
      }
      return false
    }
    
    findAndAddReply(discussion.value.latest_comments)
  } else {
    discussion.value.latest_comments.push(newReply)
    awardPoints('reply')
  }

  showReplyForm.value = false
  replyToId.value = null
}

const toggleUpvote = (replyId) => {
  if (!replyId) return
  
  const findAndToggle = (repliesArray) => {
    if (!repliesArray) return false
    
    for (let reply of repliesArray) {
      if (reply.id === replyId) {
        // Toggle between upvote and removing upvote
        reply.upvotes += reply.isUpvoted ? -1 : 1
        reply.isUpvoted = !reply.isUpvoted
        if (reply.isUpvoted) {
          awardPoints('upvote')
        }
        return true
      }
      if (reply.replies?.length && findAndToggle(reply.replies)) {
        return true
      }
    }
    return false
  }

  findAndToggle(discussion.value.latest_comments)
}

const toggleBookmark = () => {
  discussion.value.isBookmarked = !discussion.value.isBookmarked
  if (discussion.value.isBookmarked) {
    awardPoints('engagement')
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Toggle sidebar for mobile
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
// const discussion = ref(null)


</script>
<template>
  <div :class="['min-h-screen transition-colors duration-200', themeStore.isDark ? 'dark bg-gray-900' : 'bg-gray-50']">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Mobile Sidebar Toggle -->
      <button @click="toggleSidebar" class="lg:hidden mb-4 text-gray-600 dark:text-gray-400">
        <span class="sr-only">Toggle sidebar</span>
        <i class="pi pi-bars text-xl"></i>
      </button>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <!-- Header -->
          <div class="flex justify-between items-center mb-6">
            <NuxtLink to="/discussion" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              ← Back
            </NuxtLink>
            <button @click="themeStore.toggleTheme" class="text-gray-500 dark:text-gray-400 text-xl">
              {{ themeStore.isDark ? '☀️' : '🌙' }}
            </button>
          </div>
          <!-- <p>{{ discussion }}</p> -->

          <!-- Discussion Card -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div class="p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-1">
                  <!-- Tags -->
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span v-if="discussion.is_pinned" 
                          class="bg-blue-100 dark:bg-blue-900 text-blue-800 
                                 dark:text-blue-200 text-xs px-2 py-1 rounded">
                      📌 Pinned
                    </span>
                    <span v-if="discussion.is_featured" 
                          class="bg-red-100 dark:bg-red-900 text-red-800 
                                 dark:text-red-200 text-xs px-2 py-1 rounded">
                      🔥 Hot
                    </span>
                    <NuxtLink :to="`/discussion/category/${discussion.category?.slug}`" 
                             class="bg-gray-100 dark:bg-gray-700 text-gray-800 
                                    dark:text-gray-200 text-xs px-2 py-1 rounded">
                      {{ discussion.category?.name }}
                    </NuxtLink>
                    <span class="bg-green-100 dark:bg-green-900 text-green-800 
                               dark:text-green-200 text-xs px-2 py-1 rounded">
                      🎯 {{ discussion.status }}
                    </span>
                    <NuxtLink :to="`/institutes/${discussion.institution?.slug}`" 
                             class="bg-gray-100 dark:bg-gray-700 text-gray-800 
                                    dark:text-gray-200 text-xs px-2 py-1 rounded">
                      {{ discussion.institution?.name }}
                    </NuxtLink>
                  </div>

                  <!-- Title -->
                  <h1 class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ discussion.title }}
                  </h1>

                  <!-- Meta Info -->
                  <div class="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>👤 {{ discussion.author?.username || 'Anonymous' }}</span>
                    <div class="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{{ discussion.comments_count }} replies</span>
                    </div>
                    <span>👁️ {{ discussion.views }} views</span>
                    <span>⏱️ {{ new Date(discussion.last_activity * 1000).toLocaleDateString() }}</span>
                  </div>

                  <!-- Content -->
                  <div class="mt-4 text-gray-800 dark:text-gray-200">
                    <p class="whitespace-pre-line">
                      {{ showFullContent ? discussion?.content : discussion?.content?.slice(0, 500) }}
                      <span v-if="discussion?.content?.length > 500">
                        {{ showFullContent ? '' : '...' }}
                        <button 
                          @click="showFullContent = !showFullContent"
                          class="text-indigo-600 dark:text-indigo-400 hover:underline ml-2"
                        >
                          {{ showFullContent ? 'Show Less' : 'Read More' }}
                        </button>
                      </span>
                    </p>
                  </div>

                  <!-- Topic Tags -->
                  <div class="mt-2 flex flex-wrap items-center gap-2">
                    <span v-for="tag in discussion?.tags" 
                          :key="tag" 
                          class="text-xs text-gray-500 dark:text-gray-400 
                                 hover:text-indigo-600 dark:hover:text-indigo-400 
                                 cursor-pointer">
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Bookmark Button -->
                <button @click="toggleBookmark" 
                        :class="[
                          'text-2xl hover:scale-110 transition-transform',
                          discussion.isBookmarked ? 'text-indigo-600 dark:text-indigo-400' : 
                                                  'text-gray-400 dark:text-gray-500'
                        ]">
                  {{ discussion.isBookmarked ? '⭐' : '☆' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Gamification Banner -->
          <div v-if="showRewardAnimation" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50">
            +{{ userContributionScore }} points earned!
          </div>

          <!-- Reply Button -->
          <button 
            @click="showReplyForm = true" 
            class="w-full mb-6 py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white 
                   rounded-lg font-medium transition-colors"
          >
            Start a New Reply
          </button>

          <!-- Reply Form -->
          <ReplyForm
            v-if="showReplyForm"
            :discussion-id="discussion.id"
            :parent-id="replyToId"
            @success="handleReplySuccess"
            @cancel="showReplyForm = false"
          />

          <!-- Replies -->
          <div class="space-y-6">
            <div v-if="discussion?.latest_comments?.length > 0">
              <div v-for="comment in discussion.latest_comments" 
                   :key="comment.id" 
                   class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <ReplyThread 
                  :reply="{
                    id: comment.id,
                    content: comment.content,
                    author: comment.author,
                    created_on: comment.created_on,
                    upvotes: comment.upvotes,
                    downvotes: comment.downvotes,
                    is_best_answer: comment.is_best_answer,
                    edited: comment.edited,
                    edited_at: comment.edited_at,
                    replies: comment.replies || []
                  }" 
                  :depth="0"
                  :toggle-upvote="toggleUpvote"
                  :handle-reply="handleReply"
                  :toggle-thread="toggleThread"
                  :expanded-threads="expandedThreads"
                  :format-date="formatDate"
                />
              </div>
            </div>
            <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
              No replies yet. Be the first to reply!
            </div>
          </div>
        </div>

        <!-- Engagement Sidebar -->
        <div :class="[
          'w-full lg:w-80 lg:shrink-0 space-y-6',
          'fixed lg:static inset-0 bg-gray-50 dark:bg-gray-900 lg:bg-transparent z-40 transition-transform duration-300 transform',
          showSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        ]">
          <!-- Close button for mobile -->
          <button @click="toggleSidebar" class="lg:hidden absolute top-4 right-4 text-gray-500">
            <i class="pi pi-times text-xl"></i>
          </button>

          <div class="p-4 lg:p-0 overflow-y-auto h-full">
            <!-- Discussion Stats -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Discussion Stats</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Comments</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ discussion.comments_count }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Views</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ discussion.views }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Status</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ discussion.status }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600 dark:text-gray-400">Institution</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ discussion.institution?.name }}</span>
                </div>
              </div>
            </div>

            <!-- Expert Insights -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expert Insights</h3>
              <div class="space-y-4">
                <div v-for="expert in expertInsights" :key="expert.expert" class="border-b dark:border-gray-700 pb-4 last:border-0">
                  <div class="flex items-center justify-between mb-2">
                    <div>
                      <h4 class="font-medium text-gray-900 dark:text-white">{{ expert.expert }}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">{{ expert.title }}</p>
                    </div>
                    <span class="text-yellow-500">★ {{ expert.rating }}</span>
                  </div>
                  <p class="text-sm text-gray-700 dark:text-gray-300">{{ expert.insight }}</p>
                </div>
              </div>
            </div>

            <!-- Related Discussions -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Discussions</h3>
              <div class="space-y-4">
                <div v-for="discussion in relatedDiscussions" :key="discussion.id" 
                     class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-3 rounded-lg">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-2">{{ discussion.title }}</h4>
                  <div class="flex justify-between text-sm">
                    <span class="text-green-600">{{ discussion.engagement }}</span>
                    <span class="text-gray-500">{{ discussion.replies }} replies</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Achievements -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Discussion Achievements</h3>
              <div class="space-y-3">
                <div v-for="achievement in achievements" :key="achievement.id"
                     :class="['flex items-center space-x-3 p-2 rounded',
                             achievement.achieved ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700']">
                  <span class="text-2xl">{{ achievement.icon }}</span>
                  <span :class="['font-medium',
                               achievement.achieved ? 'text-green-800 dark:text-green-200' : 'text-gray-500']">
                    {{ achievement.label }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
