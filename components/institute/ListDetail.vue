<template>
    <div class="rounded-md hover:shadow-lg transition-shadow duration-300">
      <!-- <img
        src="https://intake.education/sites/default/files/94b2abfa320808c79c6381f6a5aaad9623617339.jpg"
        alt="Institute Name"
        class="w-full h-48 object-cover rounded-t-md"
      /> -->
      <div class="p-4">
        <a class="font-bold text-xl mb-2 text-blue-600 dark:text-blue-300"
          :href="localePath('/institutes/'+item.slug)"
        >{{ item.name }}</a>
  
        <p class="text-sm ">{{ item.short_description }}...</p>
      </div>
    </div>
  </template>
  <script setup>
  const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  });

const localePath = useLocalePath();
  </script>
  