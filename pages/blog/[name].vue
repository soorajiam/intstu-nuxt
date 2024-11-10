<script setup>
const localePath = useLocalePath();
const route = useRoute();
const name = ref(route.params.name);
const blog = ref("");
const items = ref([]);
const markdownToHtml = ref("");
const readingTime = ref(""); // Add reading time estimation
const shareCount = ref(0); // Track share metrics
blog.value = `# h1 Heading`;

import { marked } from 'marked';

// Fetch blog post data
const response = useCustomFetch("blogs/blog/" + name.value + "/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json", 
  },
})
.then((response) => {
  blog.value = response.data;
  markdownToHtml.value = marked.parse(blog.value.content);
  
  // Format date
  blog.value.published_on = dayjs.unix(blog.value.published_on).format("MMMM DD, YYYY");
  
  // Estimate reading time
  const words = blog.value.content.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200); // Assuming 200 words per minute
  readingTime.value = `${time} min read`;
})
.catch((error) => {
  console.error("Failed to fetch blog post:", error);
});

// Fetch related posts
const response_list = useCustomFetch("blogs/blog/?limit=3", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
.then((response_list) => {
  items.value = response_list.data.results;
})
.catch((error) => {
  console.error("Failed to fetch related posts:", error); 
});

const backgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${blog.value.featured_image}')`
}));

// SEO optimization
useSeoMeta({
  title: () => `${blog.value.title} | Intstu - Study Abroad Guide`,
  description: () => blog.value.description,
  image: () => blog.value.featured_image,
  ogTitle: () => `${blog.value.title} | Intstu - Study Abroad Guide`,
  ogDescription: () => blog.value.description,
  ogImage: () => blog.value.featured_image,
  twitterTitle: () => `${blog.value.title} | Intstu - Study Abroad Guide`,
  twitterDescription: () => blog.value.description,
  twitterImage: () => blog.value.featured_image,
  articlePublishedTime: () => blog.value.published_on,
  articleModifiedTime: () => blog.value.updated_at,
  articleTags: () => blog.value.tags,
})

const email = ref('');
const error = ref('');
const token = ref('');

const subscribe = async () => {
    validateTurnstile();
    if (error.value == '' && email.value.length>3){
    try {
        const response = await useCustomFetch('marketing/newsletter/subscribe/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
            }),
        });
        error.value = '';
    } catch (error_message) {
        error.value = 'Invalid email or already subscribed';
    }}
};

watch(email, (newValue, oldValue) => {
  if (newValue.length === 0){
    error.value = '';
    return;
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newValue)) {
    error.value = 'Please enter a valid email address';
  } else {
    error.value = '';
  }
});

const validateTurnstile = async () => {
  try {
    const { data, error } = await useFetch('/_turnstile/validate', {
      method: 'POST',
      body: { token: token }
    });

    if (error.value) {
      error.value = 'Validation failed. Please try again.';
    } else {
      error.value = '';
    }
  } catch (err) {
    error.value = 'Error: ' + err.message;
  }
};

</script>

<template>
  <main class="pb-16 lg:pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 antialiased">
    <!-- Hero Section -->
    <header class="relative w-full h-[500px] xl:h-[600px] bg-cover bg-center" :style="backgroundStyle">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      <div class="absolute bottom-0 left-0 right-0 px-4 py-16 mx-auto max-w-screen-xl">
        <!-- Category & Reading Time -->
        <div class="flex items-center gap-4 mb-6 text-sm text-gray-200">
          <span v-for="category in blog.categories" :key="category.id" 
            class="px-3 py-1 rounded-full bg-blue-600/20 backdrop-blur-sm">
            {{ category.name }}
          </span>
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ readingTime }}
          </span>
        </div>

        <h1 class="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {{ blog.title }}
        </h1>
        
        <div class="flex items-center gap-6 text-gray-200">
          <div class="flex items-center">
            <img :src="blog.author_image || '/default-avatar.png'" 
              class="w-10 h-10 rounded-full mr-3" :alt="blog.author_name">
            <div>
              <p class="font-medium">{{ blog.author_name }}</p>
              <p class="text-sm opacity-75">{{ blog.published_on }}</p>
            </div>
          </div>

          <!-- Social Share Buttons -->
          <div class="flex gap-3">
            <SocialShare v-for="network in ['facebook', 'twitter', 'linkedin']"
              :key="network" 
              :network="network" 
              :title="blog.title + ' | Intstu'" 
              :styled="true"
              :label="false"
              class="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors" />
          </div>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 mx-auto max-w-screen-xl py-12">
      <!-- Main Content -->
      <article class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <div v-html="markdownToHtml"></div>
        </div>

        <!-- Tags -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in blog.tags" :key="tag"
              class="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
              #{{ tag }}
            </span>
          </div>
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="space-y-8">
        <!-- Author Bio -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div class="flex items-center mb-4">
            <img :src="blog.author_image || '/default-avatar.png'" 
              class="w-16 h-16 rounded-full mr-4" :alt="blog.author_name">
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">{{ blog.author_name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Content Writer @Intstu</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400">Expert in international education and study abroad guidance.</p>
        </div>

        <!-- Related Posts -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 class="text-xl font-bold mb-6 text-gray-900 dark:text-white">Related Articles</h3>
          <div class="space-y-6">
            <div v-for="post in items" :key="post.id" 
              class="group cursor-pointer">
              <NuxtLink :to="localePath('/blog/'+post.slug)">
                <img :src="post.featured_image" 
                  class="w-full h-48 object-cover rounded-xl mb-4 group-hover:opacity-90 transition-opacity" 
                  :alt="post.title">
                <h4 class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ post.title }}
                </h4>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ post.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <h3 class="text-xl font-bold mb-2">Get Your Free Higher Education Success Guide</h3>
          <p class="mb-4 text-blue-100">
            Join thousands of ambitious students who receive our weekly insights on:
            <span class="block mt-2">
              ✓ Scholarship opportunities worth $10,000+ <br>
              ✓ Exclusive university admission tips <br>
              ✓ Career guidance from industry experts
            </span>
          </p>
          <form class="space-y-3">
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input 
                v-model="email" 
                type="email"
                required
                @blur="validateEmail"
                class="w-full pl-10 px-4 py-3 rounded-xl bg-white/10 placeholder-white/60 text-white border border-white/20 focus:border-white/40 focus:ring-0"
                placeholder="Enter your email for instant access"
              >
            </div>
            <button
              type="submit"
              @click.prevent="subscribe"
              class="w-full px-4 py-3 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Free Access Now
            </button>
            <NuxtTurnstile v-if="error=='' && email.length>3" class="py-3" v-model="token" />
            <p class="text-sm text-white/80">
              <span class="font-medium">🔒 100% Secure.</span> No spam ever. Unsubscribe anytime.
            </p>
            <p class="text-red-300 text-sm" v-if="error">{{ error }}</p>
          </form>
        </div>
      </aside>
    </div>
  </main>
</template>

