<script setup>
import debounce from 'lodash.debounce'

prerenderRoutes([
  "/blog/canada-doubling-financial-threshold-for-international-students-in-2024-to-20635",
  "/blog/how-to-select-course-in-a-university", 
  "/blog/when-can-i-apply-for-psw-visa-in-uk"
])

const items = ref([]);
const countries = ref("");
const selectedCountry = ref("all");
const { locale, t } = useI18n();
const search = ref("");
const next = ref("");
const previous = ref("");
const offset = ref(0);
const paginationLength = ref(1);
const page = ref(1);
const resultCount = ref(0);
const featuredPost = ref(null);

// Get countries for filter dropdown
const countries_response = useCustomFetch('country/dropdown/', {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
.then((countries_response) => {
  countries.value = countries_response.data.countries;
})
.catch((error) => {
  console.error("Failed to fetch countries");
});

const ListPosts = async () => {
  const { data, pending, error } = await useAPIFetch('blogs/blog/', {
    query: {
      limit: '12',
      offset: offset.value,
      search: search.value,
      country: selectedCountry.value,
    },
  })

  if (!pending.value && !error.value) {
    items.value = data.value.data.results;
    // Set first post as featured if on first page
    if (offset.value === 0) {
      featuredPost.value = items.value[0];
      items.value = items.value.slice(1);
    }
    next.value = data.value.next;
    previous.value = data.value.previous;
    resultCount.value = data.value.count;
    paginationLength.value = Math.ceil(resultCount.value / 12) - 1;
  }
}

// Initial load
if (items.value.length === 0) {
  ListPosts();
}

const nextPage = () => {
  if (next.value) {
    offset.value = offset.value + 12;
    page.value = page.value + 1;
    ListPosts();
  }
};

const previousPage = () => {
  if (previous.value) {
    offset.value = offset.value - 12;
    page.value = page.value - 1;
    ListPosts();
  }
};

watch(page, async (newPage, oldPage) => {
  if (newPage !== oldPage) {
    try {
      offset.value = (newPage - 1) * 12;
      ListPosts();
    } catch (error) {
      console.error(error);
    }
  }
});

watch(search, debounce(() => {
  try {
    offset.value = 0;
    page.value = 1;
    ListPosts();
  } catch (error) {
    console.error(error);
  }
}, 500))

watch(selectedCountry, async (newCountry, oldCountry) => {
  if (newCountry !== oldCountry) {
    try {
      offset.value = 0;
      page.value = 1;
      ListPosts();
    } catch (error) {
      console.error(error);
    }
  }
});

useSeoMeta({
  title: 'Student Success Stories & Study Abroad Guides | Intstu Blog',
  description: 'Discover expert tips, success stories and comprehensive guides about studying abroad. Get insights on scholarships, visas, and student life from those who\'ve been there.',
  ogTitle: 'Student Success Stories & Study Abroad Guides | Intstu Blog',
  ogDescription: 'Discover expert tips, success stories and comprehensive guides about studying abroad. Get insights on scholarships, visas, and student life from those who\'ve been there.',
  ogImage: '/images/logo/intstu_logo.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Student Success Stories & Study Abroad Guides | Intstu Blog',
  twitterDescription: 'Discover expert tips, success stories and comprehensive guides about studying abroad. Get insights on scholarships, visas, and student life from those who\'ve been there.',
  twitterImage: '/images/logo/intstu_logo.png'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 mb-6">
            {{ $t('blog_list.title') }}
          </h1>
          <p class="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-12">
            {{ $t('blog_list.description') }}
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
            <select v-model="selectedCountry" 
              class="w-full sm:w-1/3 px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
              <option value="all">All Countries</option>
              <option v-for="country in countries" :key="country[0]" :value="country[0]">
                {{ country[1] }}
              </option>
            </select>
            
            <div class="relative w-full sm:w-2/3">
              <input type="search" v-model="search"
                class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                :placeholder="$t('blog_list.search')">
              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i class="pi pi-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Post -->
    <section v-if="featuredPost" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02]">
        <div class="grid md:grid-cols-2 gap-8">
          <img :src="featuredPost.image" :alt="featuredPost.title" class="w-full h-96 object-cover">
          <div class="p-8 flex flex-col justify-center">
            <span class="text-blue-600 dark:text-blue-400 font-semibold mb-4">Featured Article</span>
            <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{{ featuredPost.title }}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">{{ featuredPost.excerpt }}</p>
            <NuxtLink :to="'/blog/' + featuredPost.slug" 
              class="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800">
              Read More
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="post in items" :key="post.id" 
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.03]">
          <BlogList :item="post"/>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="resultCount > 12" class="flex justify-center items-center gap-4 mt-16 mb-8">
        <button @click="previousPage" 
          class="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          :disabled="!previous">
          Previous
        </button>
        <span class="text-gray-600 dark:text-gray-300">
          Page {{ page }} of {{ paginationLength + 1 }}
        </span>
        <button @click="nextPage"
          class="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          :disabled="!next">
          Next
        </button>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-12">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Stay Updated with Study Abroad News</h2>
          <p class="text-blue-100 mb-8">Get the latest updates, tips and success stories delivered to your inbox.</p>
          <form class="flex flex-col sm:flex-row gap-4 justify-center">
            <input type="email" placeholder="Enter your email" 
              class="px-6 py-3 rounded-lg flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-blue-300">
            <button class="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>