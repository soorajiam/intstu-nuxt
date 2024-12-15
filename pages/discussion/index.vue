<script setup>
import { ref, onMounted } from 'vue'
import DiscussionSearch from '~/components/discussion/DiscussionSearch.vue'
import DiscussionList from '~/components/discussion/DiscussionList.vue'
import { useThemeStore } from '~/store/themeStore';

const themeStore = useThemeStore();

const selectedCategory = ref('All')
const selectedSort = ref('Latest')
const searchQuery = ref('')
const showMobileFilters = ref(false)

const discussion_list = ref([])

const categories = ['All', 'Productivity', 'Technology', 'Workspace', 'Career', 'Learning']
const sortOptions = ['Latest', 'Most Viewed', 'Most Discussed', 'Trending']

// Gamification elements
const userPoints = ref(1250)
const userLevel = ref(12)
const userBadges = ref(['Top Contributor', 'Problem Solver', 'Trending Creator'])

// Daily challenges
const dailyChallenge = ref({
  title: 'Start 3 Discussions',
  progress: 1,
  total: 3,
  reward: '+50 points'
})

const getDiscussionList = async () => {
  const { data, error } = await useSsrfetch('discussion/topics/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (error.value) {
    console.error('Error fetching discussions:', error.value)
    return
  }
  console.log('data', data.value)

  discussion_list.value = data.value?.data?.results
  console.log('discussion_list', discussion_list.value)
}

// Call it immediately since we're using SSR
await getDiscussionList()

// Community highlights
const featuredMembers = ref([
  {
    name: 'Sarah Chen',
    contributions: 156,
    expertise: ['AI', 'Productivity'],
    avatar: '👩‍💼'
  },
  {
    name: 'Alex Kumar', 
    contributions: 142,
    expertise: ['Technology'],
    avatar: '👨‍💻'
  }
])

const trendingTopics = ref([
  {
    id: 't1',
    title: "The Rise of AI in Healthcare",
    views: "128.4k",
    trend: "+42%",
    category: "Technology",
    engagementScore: 98 // New metric
  },
  {
    id: 't2',
    title: "Remote Work Best Practices 2024",
    views: "98.2k", 
    trend: "+35%",
    category: "Workspace",
    engagementScore: 95
  },
  {
    id: 't3',
    title: "Learning Web3 Development",
    views: "76.1k",
    trend: "+28%",
    category: "Learning",
    engagementScore: 92
  }
])

// Live activity feed
const recentActivity = ref([
  {
    type: 'reply',
    user: 'Maria G.',
    action: 'replied to',
    topic: 'Remote Work Setup',
    timeAgo: '2m ago'
  },
  {
    type: 'like',
    user: 'Alex K.',
    action: 'liked',
    topic: 'AI Discussion',
    timeAgo: '5m ago'
  }
])

const topics = ref([
  {
    id: 1,
    title: "What's your favorite productivity hack in 2024?",
    author: "Sarah Chen",
    replies: 234,
    views: "23.4k",
    category: "Productivity",
    lastActive: "2m ago",
    isHot: true,
    isPinned: true,
    tags: ["productivity", "habits", "work-life"],
    bookmarked: false,
    upvotes: 156,
    participationRate: "92%" // New engagement metric
  },
  {
    id: 2,
    title: "The future of AI: Discussion thread",
    author: "Alex Kumar",
    replies: 567,
    views: "45.2k",
    category: "Technology",
    lastActive: "5m ago",
    isHot: true,
    tags: ["ai", "future", "tech"],
    bookmarked: false,
    upvotes: 342,
    participationRate: "88%"
  },
  {
    id: 3,
    title: "Share your remote work setup!",
    author: "Maria Garcia",
    replies: 189,
    views: "12.8k",
    category: "Workspace",
    lastActive: "15m ago",
    tags: ["remote-work", "setup", "workspace"],
    bookmarked: false,
    upvotes: 98,
    participationRate: "85%"
  }
])

const toggleBookmark = (topicId) => {
  const topic = topics.value.find(t => t.id === topicId)
  if (topic) {
    topic.bookmarked = !topic.bookmarked
    // Reward points for engagement
    if(topic.bookmarked) {
      userPoints.value += 5
    }
  }
}
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-200', 
       themeStore.isDark ? 'dark bg-gray-900' : 'bg-gray-50']">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header with Dark Mode Toggle and User Stats -->
      <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Discussions
          </h1>
          <NuxtLink to="/discussion/create-discussion" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm">
            Start Discussion
          </NuxtLink>
          <div class="flex flex-wrap items-center gap-2 text-sm">
            <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              🏆 Level {{ userLevel }}
            </span>
            <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              ⭐ {{ userPoints }} pts
            </span>
          </div>
        </div>
        <button @click="themeStore.toggleTheme" 
                class="text-gray-500 dark:text-gray-400 text-xl">
          {{ themeStore.isDark ? '☀️' : '🌙' }}
        </button>
      </div>

      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Sidebar - User Engagement -->
        <div class="w-full lg:w-64 lg:shrink-0 flex flex-col sm:flex-row lg:flex-col gap-4">
          <div class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 class="font-semibold mb-3">🎯 Daily Challenge</h2>
            <div class="space-y-2">
              <p class="text-sm">{{ dailyChallenge.title }}</p>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" 
                     :style="`width: ${(dailyChallenge.progress/dailyChallenge.total)*100}%`">
                </div>
              </div>
              <p class="text-xs text-green-600 dark:text-green-400">
                Reward: {{ dailyChallenge.reward }}
              </p>
            </div>
          </div>

          <div class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 class="font-semibold mb-3">🏅 Your Badges</h2>
            <div class="space-y-2">
              <div v-for="badge in userBadges" 
                   :key="badge"
                   class="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {{ badge }}
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <DiscussionSearch
            v-model:searchQuery="searchQuery"
            v-model:selectedCategory="selectedCategory"
            v-model:selectedSort="selectedSort"
            :categories="categories"
            :sortOptions="sortOptions"
          />

          <DiscussionList
            :discussionList="discussion_list"
            @toggle-bookmark="toggleBookmark"
          />
        </div>

        <!-- Right Sidebar -->
        <div class="w-full lg:w-80 lg:shrink-0 space-y-6">
          <!-- Grid for mobile, stack for desktop -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <!-- Trending Topics -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span class="mr-2">📈</span> Trending Now
              </h2>
              <div class="space-y-4">
                <div v-for="topic in trendingTopics" 
                     :key="topic.id"
                     class="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                            transition-colors cursor-pointer">
                  <div class="flex items-start justify-between">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white 
                               hover:text-indigo-600 dark:hover:text-indigo-400">
                      {{ topic.title }}
                    </h3>
                    <span class="text-xs font-medium text-green-600 dark:text-green-400">
                      {{ topic.trend }}
                    </span>
                  </div>
                  <div class="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{{ topic.category }}</span>
                    <span>•</span>
                    <span>{{ topic.views }} views</span>
                    <span>•</span>
                    <span class="text-yellow-600">🔥 {{ topic.engagementScore }}% engaged</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Featured Members -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🌟 Featured Members
              </h2>
              <div class="space-y-4">
                <div v-for="member in featuredMembers" 
                     :key="member.name"
                     class="flex items-center gap-3 p-2 hover:bg-gray-50 
                            dark:hover:bg-gray-700 rounded-lg">
                  <span class="text-2xl">{{ member.avatar }}</span>
                  <div>
                    <h3 class="font-medium">{{ member.name }}</h3>
                    <p class="text-sm text-gray-500">
                      {{ member.contributions }} contributions
                    </p>
                    <div class="flex gap-1 mt-1">
                      <span v-for="skill in member.expertise" 
                            :key="skill"
                            class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Live Activity Feed -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🔴 Live Activity
              </h2>
              <div class="space-y-3">
                <div v-for="activity in recentActivity" 
                     :key="activity.timeAgo"
                     class="text-sm">
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ activity.user }} {{ activity.action }} "{{ activity.topic }}"
                  </p>
                  <p class="text-xs text-gray-400">{{ activity.timeAgo }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
