<template>



<h1>Dashboard</h1>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
</script>