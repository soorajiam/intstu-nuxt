<template>
  <div>

    <nav class="flex ml-3 my-2" aria-label="Breadcrumb" >
  <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li v-for="nav in navs" :key="nav.name" class="inline-flex items-center">
      <a :href="localePath(nav.link)" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        
        {{ nav.name }}
      </a>

      <svg v-if="!(navs.length -1 == navs.indexOf(nav))" class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
    </li>
   
 
  </ol>
</nav>
    
  </div>
</template>

<script lang="ts" setup>

const localePath = useLocalePath();


const props = defineProps({
  navs : Array 
})

</script>

<style>

</style>