<template>
  <header>
    <nav class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" class="flex items-center">
          <img src="/images/logo/intstu_logo.png" class="mr-3 h-8 sm:h-10" alt="Intstu Logo" />
          <span class="self-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">{{ $t('company_name') }}</span>
        </a>
        <div class="flex items-center lg:order-2 space-x-3">
          <div v-if="!userStore.isLogged" class="flex space-x-2">
            <NuxtLink to="/auth/login/"
              class="text-gray-700 dark:text-white hover:bg-white/60 dark:hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200">
              {{ $t('home.log_in') }}</NuxtLink>
            <NuxtLink to="/auth/signup/"
              class="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 transform hover:scale-105">
              {{ $t('home.sign_up') }}
            </NuxtLink>
          </div>

          <div v-else class="flex space-x-2">
            <NuxtLink to="/dashboard"
              class="text-gray-700 dark:text-white hover:bg-white/60 dark:hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200">
              {{ $t('home.dashboard') }}</NuxtLink>
            <NuxtLink to="/auth/logout"
              class="text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200">
              {{ $t('home.log_out') }}</NuxtLink>
          </div>

          <button @click="mobileMenuOpen = !mobileMenuOpen" 
            class="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2" aria-expanded="false">
            <span class="sr-only">Toggle menu</span>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        <div :class="['lg:flex justify-between items-center w-full lg:w-auto lg:order-1', {'hidden': !mobileMenuOpen, 'block': mobileMenuOpen}]"
          id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a href="/blog/"
                class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                {{ $t('home.blog') }}</a>
            </li>
            <li>
              <a href="/institutes/"
                class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                {{ $t('home.institutes') }}</a>
            </li>
            <li>
              <a href="/contact/"
                class="block py-2 pr-4 pl-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                {{ $t('home.contact') }}</a>
            </li>
            <Button
              @click="toggleTheme"
              :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
              class="p-button-rounded p-button-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              v-tooltip.bottom="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            />
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();
const mobileMenuOpen = ref(false);
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
  localStorage.theme = isDark.value ? 'dark' : 'light';
};

onMounted(() => {
  const darkMode = localStorage.theme === 'dark' || 
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  isDark.value = darkMode;
  
  if (darkMode) {
    document.documentElement.classList.add('dark');
  }
});
</script>

<style>
/* Remove the theme customizations since we're using the default PrimeVue theme */
</style>