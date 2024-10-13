<template>
  <header>
    <nav class="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a :href="localePath('/')" class="flex items-center">
          <img src="/images/logo/intstu_logo.png" class="mr-3 h-6 sm:h-9" alt="Intstu Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{{ $t('company_name') }}</span>
        </a>
        <div class="flex items-center lg:order-2">
          <div v-if="!userStore.isLogged">
            <NuxtLink :to="localePath('/auth/login/')"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              {{ $t('home.log_in') }}</NuxtLink>
            <NuxtLink :to="localePath('/auth/signup')"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              {{ $t('home.sign_up') }}
            </NuxtLink>
          </div>

          <div v-else>
            <NuxtLink :to="localePath('/dashboard')"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              {{ $t('home.dashboard') }}</NuxtLink>
            <NuxtLink :to="localePath('/auth/logout')"
              class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:px-5 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              {{ $t('home.log_out') }}</NuxtLink>
          </div>

          <button @click="mobileMenuOpen = !mobileMenuOpen" data-collapse-toggle="mobile-menu-2" type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div v-if="mobileMenuOpen" class="lg:hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a :href="localePath('/blog/')"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">
                {{ $t('home.blog') }}</a>
            </li>
            <li>
              <a :href="localePath('/institutes/')"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">
                {{ $t('home.institutes') }}</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">
                {{ $t('home.contact') }}</a>
            </li>
            <button @click="changeTheme()" data-tooltip-target="tooltip-dark" type="button"
              class="inline-flex items-center p-2 mr-1 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>
          </ul>
        </div>

        <div class="hidden lg:flex justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a :href="localePath('/blog/')"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">
                {{ $t('home.blog') }}</a>
            </li>
            <li>
              <a :href="localePath('/institutes/')"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">
                {{ $t('home.institutes') }}</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-600 lg:p-0 dark:text-gray-400 lg:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-primary-500 lg:dark:hover:bg-transparent dark:border-gray-700">
                {{ $t('home.contact') }}</a>
            </li>
            <button @click="changeTheme()" data-tooltip-target="tooltip-dark" type="button"
              class="inline-flex items-center mr-1 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
              <SunIcon v-if="isDark" class="w-6 h-6" />
              <MoonIcon v-else class="w-6 h-6" />
            </button>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from '~/store/userStore';
import { useI18n } from 'vue-i18n';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';

const userStore = useUserStore();
const mobileMenuOpen = ref(false);
const isDark = ref(true);
const { locales, locale, setLocale } = useI18n();

const current_language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});

const changeTheme = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  isDark.value = document.documentElement.classList.contains("dark");
};

const localePath = useLocalePath();

if (process.client) {
  onMounted(() => {
    document.documentElement.classList.add(localStorage.theme || "dark");
    localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    isDark.value = document.documentElement.classList.contains("dark");
  });
}
</script>