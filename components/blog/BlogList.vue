<script setup>
const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });

const localePath = useLocalePath();

</script>

<template>
    <article>
                <a href="#">
                    <img :src="item.featured_image" class="mb-5 w-full max-w-full rounded-lg h-64" alt="Image 1">
                </a>
                <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    <NuxtLink :to="localePath('/blog/'+item.slug)">{{item.title}}</NuxtLink>
                </h2>
                <NuxtLink :to="localePath('/blog/'+item.slug)" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:text-blue-600 hover:no-underline">
                    Read more
                </NuxtLink>
            </article>
</template>