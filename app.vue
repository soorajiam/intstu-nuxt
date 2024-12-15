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



import { onMounted, watchEffect } from 'vue'
import { useUserStore } from '~/store/userStore'


const userStore = useUserStore()

onMounted(() => {
  console.log('onMounted')
  if (process.client) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    const firstName = localStorage.getItem('first_name')
    const lastName = localStorage.getItem('last_name')
    if (token && userId) {
      console.log('token and userId found')
      userStore.login(userId, token, firstName, lastName)
    }
  }
  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
  }
})







const { locale } = useI18n();

</script>
