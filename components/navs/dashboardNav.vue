<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full">
    <div class="flex items-center h-14 px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <img src="/images/logo/intstu_logo.png" class="h-8 w-auto" alt="Intstu Logo" />
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex-grow flex items-center justify-end sm:hidden">
        <Button icon="pi pi-bars" class="p-button-text" @click="toggleMobileMenu" />
      </div>

      <!-- Search Input and Navigation Icons -->
      <div class="hidden sm:flex flex-grow mx-4 items-center">
        <!-- Search Input -->
        <div class="flex-grow">
          <InputText placeholder="Search" v-model="searchQuery" :style="{ width: '100%' }" />
        </div>

        <!-- Navigation Icons -->
        <div class="flex items-center space-x-4 ml-4">
          <Button icon="pi pi-home" class="p-button-text" tooltip="Home" tooltipPosition="bottom" />
          <NuxtLink to="/discussion">
            <Button icon="pi pi-users" class="p-button-text" tooltip="My Network" tooltipPosition="bottom" />
          </NuxtLink>
          <Button icon="pi pi-briefcase" class="p-button-text" tooltip="Jobs" tooltipPosition="bottom" />
          <Button icon="pi pi-comments" class="p-button-text" tooltip="Messaging" tooltipPosition="bottom" />
          <Button icon="pi pi-bell" class="p-button-text" tooltip="Notifications" tooltipPosition="bottom" />

          <!-- User Menu -->
          <SplitButton
            label="Me"
            :model="userMenuItems"
            class="p-button-text"
            :icon="userAvatar"
            iconPos="right"
          >
          </SplitButton>

          <!-- Theme Toggle -->
          <Button
            @click="toggleTheme"
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            class="p-button-rounded p-button-text"
            :tooltip="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            tooltipPosition="bottom"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="sm:hidden">
      <div class="px-4 pt-2 pb-3 space-y-1">
        <InputText placeholder="Search" v-model="searchQuery" :style="{ width: '100%' }" class="mb-2" />

        <Button icon="pi pi-home" label="Home" class="p-button-text w-full text-left" />
        <NuxtLink to="/discussion" class="p-button-text w-full text-left">
          <Button icon="pi pi-users" label="My Network" class="p-button-text w-full text-left" />
        </NuxtLink>
        <Button icon="pi pi-briefcase" label="Jobs" class="p-button-text w-full text-left" />
        <Button icon="pi pi-comments" label="Messaging" class="p-button-text w-full text-left" />
        <Button icon="pi pi-bell" label="Notifications" class="p-button-text w-full text-left" />

        <!-- User Menu -->
        <SplitButton
          label="Me"
          :model="userMenuItems"
          class="p-button-text w-full text-left"
          :icon="userAvatar"
          iconPos="right"
        >
        </SplitButton>

        <!-- Theme Toggle -->
        <Button
          @click="toggleTheme"
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          class="p-button-rounded p-button-text w-full text-left"
          :tooltip="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          tooltipPosition="bottom"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';

import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();

const searchQuery = ref('');
const isDark = ref(false);
const isMobileMenuOpen = ref(false);
const userAvatar = ref('pi pi-user'); // Replace with actual user avatar
const userMenuItems = [
  { label: 'Your Profile', icon: 'pi pi-user', command: () => { /* Navigate to profile */ } },
  { label: 'Settings', icon: 'pi pi-cog', command: () => { /* Navigate to settings */ } },
  { label: 'Sign out', icon: 'pi pi-sign-out', command: () => { userStore.logout(); navigateTo('/') } }
];

onMounted(() => {
  const darkMode = localStorage.theme === 'dark' || 
    (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  isDark.value = darkMode;
  
  if (darkMode) {
    document.documentElement.classList.add('dark');
  }

  const navbar = document.querySelector('header');
  if (navbar) {
    const height = `${navbar.offsetHeight}px`;
    document.documentElement.style.setProperty('--navbar-height', height);
  }
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
  localStorage.theme = isDark.value ? 'dark' : 'light';
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style>
:root {
  --navbar-height: 56px;
}
</style>