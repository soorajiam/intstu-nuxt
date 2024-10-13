<template>
  <header class="bg-white border-b border-gray-200  w-full ">
    <div class="px-1 sm:px-6 lg:px-8">
      <div class="flex sm:justify-between items-center h-14">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a :href="localePath('/')" class="flex items-center">
            <img src="/images/logo/intstu_logo.png" class="h-8 w-auto" alt="Intstu Logo" />
          </a>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 sm:max-w-xl mx-4 max-w-64">
          <div class="">
            <input type="search" placeholder="Search" class="w-full bg-gray-100 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Navigation Icons -->
        <nav class=" items-center space-x-6 hidden sm:flex">
          <a href="#" class="text-gray-500 hover:text-gray-900">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="#" class="text-gray-500 hover:text-gray-900">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </a>
          <a href="#" class="text-gray-500 hover:text-gray-900">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd" />
            </svg>
          </a>
        </nav>

        

        <!-- User Menu -->
        <div class="ml-4 flex items-center">
          <div class="relative">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:shadow-outline" id="user-menu" aria-label="User menu" aria-haspopup="true">
              <img class="h-8 w-8 rounded-full" src="https://Intstu.com/docs/images/people/profile-picture-5.jpg" alt="User avatar">
            </button>
            <div v-if="showUserMenu" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
              <div class="py-1 rounded-md bg-white shadow-xs">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          </div>
          <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SunIcon, MoonIcon, Squares2X2Icon, QueueListIcon, FingerPrintIcon, NewspaperIcon, RssIcon, ChatBubbleLeftRightIcon, RocketLaunchIcon, SparklesIcon, HandRaisedIcon } from '@heroicons/vue/24/solid'

const showUserMenu = ref(false)
const localePath = useLocalePath()

onMounted(() => {
  const navbar = document.querySelector('header')
  if (navbar) {
    const height = `${navbar.offsetHeight}px`
    document.documentElement.style.setProperty('--navbar-height', height)
  }
})

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

</script>

<style>
:root {
  --navbar-height: 56px; /* Default value, will be updated by JavaScript */
}
</style>