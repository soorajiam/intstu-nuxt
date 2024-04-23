<template>
    <aside aria-label="Related articles" class="py-8 bg-white lg:py-16 dark:bg-gray-900 antialiased">
    <div class="px-4 mx-auto max-w-screen-xl">
        <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Read Next</h2>
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            <article v-for="blog in items" :key="blog.id">
                <a :href="localePath('/blog/'+blog.slug)">
                    <img :src="blog.featured_image" class="mb-5 w-full max-w-full rounded-lg h-64" alt="Image 6">
                </a>
                <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <a :href="localePath('/blog/'+blog.slug)">{{blog.title}}</a>
                </h2>
                <a :href="localePath('/blog/'+blog.slug)" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                    Read more
                </a>
            </article>
        </div>
    </div>
</aside>

</template>

<script setup>

import { ref } from 'vue';

const items = ref([]);

const getBlogPosts = () => {
  const response = useCustomFetch('blogs/blog/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: {
      limit: '6',
    },
  })
    .then((response) => {
      items.value = response.data.results;
    })
    .catch((error) => {
      //console.log("Error");
    });
};
getBlogPosts();

</script>