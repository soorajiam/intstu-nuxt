<script setup>

// localePath = useLocalePath()

defineProps({
    error: {
        type: Object,
        required: true
    }
})

</script>


<template>
<template>
  <NuxtLayout>
    <div class="prose">
      <h1>Dang</h1>
            <p>
              <strong>{{ error.message }}</strong>
            </p>
      <p>It looks like something broke.</p>
      <p>Sorry about that.</p>
    </div>
  </NuxtLayout>
</template>
</template>