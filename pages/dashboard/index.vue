<template>



<h1>Dashboard</h1>
<p>{{ user }}</p>
</template>

<script setup>

const user =  useSupabaseUser()
console.log('user', user.value)
definePageMeta({
  // middleware: 'user-auth',
  layout: 'dashboard',
})
</script>