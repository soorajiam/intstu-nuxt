<template>
    <aside aria-label="Related articles" class="py-8 bg-white lg:py-16 dark:bg-gray-900 antialiased">
    <div class="px-4 mx-auto max-w-screen-xl">
        <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Read Next</h2>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <BlogList
                v-for="(item, index) in items" :key="index" :item="item"
            />
        </div>
    </div>
</aside>

</template>

<script setup>

const items = ref([])

const ListPosts = () => {
  const { data, pending, error } =  useAPIFetch('blogs/blog/', {
    query: {
      limit: '6',
     
    },
  })

  // To process the data after it's fetched
if (!pending.value && !error.value) {
  items.value = data.value.data.results;

}

}
ListPosts()

</script>