<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true
  },
  selectedCategory: {
    type: String,
    required: true
  },
  selectedSort: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  sortOptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:searchQuery', 'update:selectedCategory', 'update:selectedSort'])
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
    <div class="flex flex-col gap-4">
      <!-- Search -->
      <div class="w-full">
        <input 
          :value="searchQuery"
          @input="emit('update:searchQuery', $event.target.value)"
          type="text"
          placeholder="Search discussions..."
          class="w-full px-4 py-2 rounded-lg border dark:border-gray-600 
                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
      </div>
      
      <div class="flex flex-wrap gap-4">
        <!-- Category Filter -->
        <select 
          :value="selectedCategory"
          @change="emit('update:selectedCategory', $event.target.value)"
          class="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 
                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <!-- Sort Options -->
        <select 
          :value="selectedSort"
          @change="emit('update:selectedSort', $event.target.value)"
          class="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 
                 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option v-for="option in sortOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template> 