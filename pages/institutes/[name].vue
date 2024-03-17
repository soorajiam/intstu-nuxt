<script setup>

const route = useRoute()
const name = ref(route.params.name)

const data = ref("");
const paragraphs = ref("");

const response = useCustomFetch("institutes/institutions/public/" + name.value + "/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
    data.value = response.data;
    paragraphs.value = data.value.description.split("\n\n");
   
    console.log(data.value);

  })
  .catch((error) => {
    console.log(error.response);
  });

</script>

<template>
     <section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{{data.name}}</h2>

          
          <a :href="data.website" class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
              {{data.website}}
              <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>
          <p class="mb-4 font-light">{{ data.address }}</p>
      </div>
  </div>
</section>


<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-216 lg:py-24">
   
    <div class="grid grid-cols-1 gap-8 mt-2 lg:gap-16 lg:grid-cols-2 lg:mt-2">
      
      <div class="space-y-8" v-for="item in paragraphs" :key="item">
        <div >
         
          <p class="mt-2 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{item}}
          </p>
        </div>

       
      </div>
    </div>
  </div>
</section>
</template>