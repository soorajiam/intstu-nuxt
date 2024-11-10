<template>
  <section class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 border-y border-gray-100 dark:border-gray-700">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="mb-8 md:mb-0 md:mr-8 max-w-2xl">
          <span class="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300">Featured in Top University Rankings</span>
          <h2 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Elevate Your Institution's Global Standing
          </h2>
          <p class="mt-3 text-base text-gray-600 dark:text-gray-300">
            Join over 500+ world-ranked universities showcasing their excellence on Intstu. Get featured in our global rankings, attract top international talent, and enhance your institution's visibility.
          </p>
          <div class="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <NuxtLink 
              to="/claim-institute-page"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <svg class="mr-2 -ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Verify Your Institution
            </NuxtLink>
            <div class="flex items-center space-x-4">
              <!-- <div class="flex -space-x-2">
                <img class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="" alt="Oxford">
                <img class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="" alt="MIT">
                <img class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="" alt="Stanford">
              </div> -->
              <span class="text-sm text-gray-500 dark:text-gray-400">
                Trusted by leading institutions
              </span>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 relative">
          <div class="absolute -top-4 -right-4 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
            <span class="text-xs font-medium text-blue-600 dark:text-blue-400">Early Access Benefits</span>
          </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-sm">
            <div class="space-y-4">
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Limited Time Free Registration
              </div>
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Priority Listing Benefits
              </div>
              <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Early Adopter Advantages
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>
