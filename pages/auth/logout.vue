<template>
    <h1 class="text-3xl text-center">Logging out...</h1>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

// const localePath = useLocalePath();
const userStore = useUserStore();
const client = useSupabaseClient();

const { error } = await client.auth.signOut()

if (process.client) {
  userStore.logout();

  navigateTo('/');
}
</script>