<template>
  <Head>
    <Meta name="google-adsense-account" content="ca-pub-9324362451727622" />
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9324362451727622"
     crossorigin="anonymous" />
  </Head>
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
  //console.log('token found');
  userStore.login(
    localStorage.getItem('user_id'),
    localStorage.getItem('token'),
  );
}
}



const { locale } = useI18n();

</script>
