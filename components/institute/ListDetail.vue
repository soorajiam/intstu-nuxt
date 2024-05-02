<template>
  <div class="rounded-md hover:shadow-lg transition-shadow duration-300">
    <!-- <img
        src="https://intake.education/sites/default/files/94b2abfa320808c79c6381f6a5aaad9623617339.jpg"
        alt="Institute Name"
        class="w-full h-48 object-cover rounded-t-md"
      /> -->
    <div class="p-4 flex w-full">
      <a class="w-2/3 font-bold text-xl mb-2 text-blue-600 dark:text-blue-300"
        :href="localePath('/institutes/' + item.slug)">{{ item.name }}</a>
      <div class="w-1/3 flex justify-end">
        <button @click="handleAddToList()" class="bg-blue-400 h-9 hover:bg-blue-600 text-white p-2 rounded-md text-sm flex">
          <span>
            <PlusCircleIcon class="h-5 w-5" />
          </span>
          <span class="ml-1">Shortlist</span>
        </button>
      </div>




    </div>
    <p class="text-sm p-2">{{ item.short_description }}...</p>
  </div>
</template>


<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['openLoginModal']);

import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from "~/store/userStore"
const userStore = useUserStore()

const handleAddToList = () => {
  if (userStore.isLoggedIn) {
    console.log('Add to list')
  } else {
    // emit event to parent
    emit('openLoginModal')
  
}
}


const localePath = useLocalePath();
</script>