<template>
  <Head>
    <Meta name="google-adsense-account" content="ca-pub-9324362451727622" />
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9324362451727622"
     crossorigin="anonymous" />
  </Head>
  <div class="bg-white dark:bg-gray-800">
    <NuxtLayout>
    <NuxtPage />
    
  </NuxtLayout>

  </div>

</template>


<script setup>
import { useUserStore } from './store/userStore';

const userStore = useUserStore();

if (process.client) {
  if (localStorage.getItem('token')) {

  userStore.login(
    localStorage.getItem('user_id'),
    localStorage.getItem('token'),
  );

  userStore.server_login(
    localStorage.getItem('server_user_id'),
    localStorage.getItem('server_token'),
  );
  }
}



import { onMounted, watchEffect } from 'vue'

const theme = ref('light')

if (process.client) {
  onMounted(() => {
  document.documentElement.classList.add(localStorage.theme || "dark");
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  //isDark.value = document.documentElement.classList.contains("dark");
})

watchEffect(() => {
  document.documentElement.classList.add(localStorage.theme || "dark");
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  //isDark.value = document.documentElement.classList.contains("dark");
})
}






const { locale } = useI18n();

</script>
