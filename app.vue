<template>
  <div class="bg-white dark:bg-gray-800">
    <NuxtLayout>
    <NuxtPage />
    <!-- <h1>Events</h1> -->
  </NuxtLayout>
  </div>

</template>


<script setup>
import { useUserStore } from './store/userStore';

const userStore = useUserStore();

if (process.client) {
  if (localStorage.getItem('token')) {
  console.log('token found');
  userStore.login(
    localStorage.getItem('user_id'),
    localStorage.getItem('token'),
  );
}
}



const { locale } = useI18n();

</script>
