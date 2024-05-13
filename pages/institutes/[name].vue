<script setup>

const route = useRoute()
const name = ref(route.params.name)

const data = ref("");
const paragraphs = ref("");

const details = ref({})







  const getInstitutionData = async ()  => {
    const {data, error} = await useAPIFetch("institutes/institutions/public/" + name.value + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (error.value) {
      console.log(error.value);
    } else {
      details.value = data.value.data;
      console.log(details.value.name);
      paragraphs.value = details.value.description.split("\n\n");
    }
  }
  getInstitutionData();


useSeoMeta({
  title: () => 'Intstu | ' + data.value.name,
  description: () => data.value.short_description,
  image: () => data.value.image,
  ogTitle: () => 'Intstu | ' + data.value.name,
  ogDescription: () => data.value.short_description,
  ogImage: () => data.value.image,
  twitterTitle: () => 'Intstu | ' + data.value.name,
  twitterDescription: () => data.value.short_description,
  twitterImage: () => data.value.image,
})





</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">{{ details.name }}</h2>


        <a :href="details.website"
          class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700">
          {{ details.website }}
          <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"></path>
          </svg>
        </a>
        <p class="mb-4 font-light">{{ details.address }}</p>
      </div>
      <p class="">Share:</p>
      <div class="flex flex-row gap-2">
        
        <SocialShare v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'reddit', 'whatsapp']"
          :key="network" :network="network" :title="details.name + ' in Intstu'" :styled="true" :label="false"
          class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" />
      </div>
     
    </div>
  </section>


  <section class="bg-white dark:bg-gray-900">
    <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-216 lg:py-24">

      <div class="grid grid-cols-1 gap-8 mt-2 lg:gap-16 lg:grid-cols-2 lg:mt-2">

        <div class="space-y-8" v-for="item in paragraphs" :key="item">
          <div>

            <p class="mt-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              {{ item }}
            </p>
          </div>


        </div>
      </div>
    </div>
  </section>
</template>