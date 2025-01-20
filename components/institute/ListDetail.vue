<template>
  <div class="rounded-md hover:shadow-lg transition-shadow duration-300">
    <div class="p-3 flex w-full">
      <a class="w-2/3 font-bold text-lg mb-1 text-blue-600 dark:text-blue-300"
        :href="localePath('/institutes/' + item.slug)">{{ item.name }}</a>
      <div class="w-1/3 flex justify-end">
        <button @click="handleAddToList()" 
                class="bg-blue-400 h-8 hover:bg-blue-600 text-white px-2 rounded-md text-sm flex items-center">
          <PlusCircleIcon class="h-4 w-4" />
          <span class="ml-1">Shortlist</span>
        </button>
      </div>
    </div>
    
    <p class="text-sm px-3 pb-2">{{ item.short_description }}...</p>
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
    emit('openLoginModal')
  }
}

const localePath = useLocalePath();
</script>