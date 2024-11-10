<template>
<header class="flex flex-col antialiased">
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900 dark:border-gray-800 order-1 border-b">
      <div class="flex justify-between items-center">
          <div class="flex flex-shrink-0 justify-start items-center">
              <NuxtLink to="/" class="flex mr-6">
                <img src="/images/logo/intstu_logo.png" class="mr-3 h-8" alt="Intstu Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Intstu</span>
              </NuxtLink>
          </div>

          <ul class="hidden md:flex items-center space-x-8">
              <li v-for="feature in publishedFeatures" :key="feature.title">
                  <NuxtLink :to="feature.link" class="flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      <component :is="feature.icon" class="w-5 h-5 mr-2" />
                      {{ feature.title }}
                  </NuxtLink>
              </li>
              <li>
                  <button @click="changeTheme()" class="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                      <SunIcon v-if="isDark" class="w-6 h-6" />
                      <MoonIcon v-else class="w-6 h-6" />
                  </button>
              </li>
          </ul>

          <button type="button" class="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </button>
      </div>
  </nav>
</header>
</template>

<script setup>
import { SunIcon, MoonIcon, Squares2X2Icon, QueueListIcon, FingerPrintIcon } from '@heroicons/vue/24/solid'

const isDark = ref(false);
// const localePath = useLocalePath();

const featuresAvailable = [
  {
    title: "Dashboard",
    icon: Squares2X2Icon,
    published: true,
    link: "/dashboard/"
  },
  {
    title: "List",
    icon: QueueListIcon,
    published: true,
    link: "/dashboard/list/"
  },
  {
    title: "Your details",
    icon: FingerPrintIcon,
    published: false,
    link: "/dashboard/user-details/"
  }
];

const publishedFeatures = computed(() => {
  return featuresAvailable.filter(feature => feature.published);
});

const changeTheme = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  isDark.value = document.documentElement.classList.contains("dark");
};
</script>