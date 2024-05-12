<script setup>

const localePath = useLocalePath();
const route = useRoute()
const name = ref(route.params.name)
const blog = ref("");
const items = ref([]);
const markdownToHtml = ref("");
blog.value = `# h1 Heading`;

import { marked } from 'marked';

const response = useCustomFetch("blogs/blog/" + name.value + "/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    // //console.log(response);
    blog.value = response.data;
    markdownToHtml.value = marked.parse(blog.value.content);
    blog.value.published_on = dayjs.unix(blog.value.published_on).format(
      "MMMM DD, YYYY"
    );
    // //console.log(blog.value);

  })
  .catch((error) => {
    //console.log(error.response);
  });

const backgroundStyle = computed(() => ({
  backgroundImage: `url('${blog.value.featured_image}')`
}));

const response_list = useCustomFetch("blogs/blog/?limit=3", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response_list) => {
    items.value = response_list.data.results;

  })
  .catch((error) => {
    //console.log(error.response);
  });


// const markdownToHtml = computed(() => {
//     //console.log(blog.value)
//   return marked.parse(blog.value.content)

// // return marked.parse(`# h1 Heading`)
// })

//   useSeoMeta({
//   title: 'Intstu - Institute List',
//   ogTitle: 'Intstu - Institute List',
//   description: 'Fins the best institutes to study. Compare, make a list and apply to the best institutes.',
//   ogDescription: 'Fins the best institutes to study. Compare, make a list and apply to the best institutes.',
//   ogImage: '/images/logo/intstu_logo.png',
//   twitterCard: 'summary_large_image',
//   twitterTitle: 'Intstu - Institute List',
//   twitterDescription: 'Fins the best institutes to study. Compare, make a list and apply to the best institutes.',
//   twitterImage: '/images/logo/intstu_logo.png',
  
// })

useSeoMeta({
  title: () => 'Intstu | ' + blog.value.title,
  description: () => blog.value.description,
  image: () => blog.value.featured_image,
  ogTitle: () => 'Intstu | ' + blog.value.title,
  ogDescription: () => blog.value.description,
  ogImage: () => blog.value.featured_image,
  twitterTitle: () => 'Intstu | ' + blog.value.title,
  twitterDescription: () => blog.value.description,
  twitterImage: () => blog.value.featured_image,
})

</script>



<template>

  <main class="pb-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased mb-12">
    <header class="w-full h-[460px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken bg-gray-500  relative "
      :style="backgroundStyle">
      <div class="absolute top-0 left-0  h-full  bg-no-repeat" :style="backgroundStyle"></div>
      <div
        class="absolute top-20 left-1/2 px-4 mx-auto w-full max-w-screen-xl -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:px-0">
        <span class="block mb-4 text-gray-300">Published in <span href="#"
            class="font-semibold text-white hover:underline flex gap-2 flex-wrap">
            <span v-for="country in blog.countries" :key="country.id">
              <country-flag :country="country.country_code" size="normal"></country-flag>
            </span>
          </span></span>
        <h1 class="mb-4 max-w-4xl text-2xl font-extrabold leading-none text-white sm:text-3xl lg:text-4xl">
          {{ blog.title }}</h1>
        <p class="text-lg font-normal text-gray-100">{{ blog.description }}</p>
      </div>
    </header>
    <div
      class="flex relative z-20 justify-between p-6 mx-auto -m-36 mx-4 max-w-screen-xl bg-white dark:bg-gray-800 rounded xl:-m-32 xl:p-9 xl:mx-auto">
      <article
        class="xl:w-[828px] w-full max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <div class="flex flex-col lg:flex-row justify-between lg:items-center">
          <div class="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-base mb-2 lg:mb-0">
            <span>By <a href="#"
                class="text-gray-900 dark:text-white hover:underline no-underline font-semibold">IntStu</a></span>
            <span class="bg-gray-300 dark:bg-gray-400 w-2 h-2 rounded-full"></span>
            <span><time class="font-normal text-gray-400 dark:text-gray-500" :datetime="blog.published_on">{{
        blog.published_on
      }}</time></span>
          </div>
          <aside aria-label="Share social media">
            <div class="flex flex-row gap-2">
        
        <SocialShare v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'reddit', 'whatsapp']"
          :key="network" :network="network" :title="blog.title + ' in Intstu'" :styled="true" :label="false"
          class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" />
      </div>
          </aside>
        </div>
        <div class="mt-8  prose prose-slate dark:prose-invert mx-auto lg:prose-lg">
          <div>
            <div class="" v-html="markdownToHtml"></div>
          </div>
          <!-- {{ blog }} -->
        </div>
        <!-- <section class="not-format">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
            <div>
              <button type="button"
                class="py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Subscribe</button>
            </div>
          </div>
          <form class="mb-6">
            <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div class="py-2 px-4 bg-gray-50 rounded-t-lg dark:bg-gray-800">
                <label for="comment" class="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                  class="px-0 w-full text-sm text-gray-900 bg-gray-50 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..." required></textarea>
              </div>
              <div class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                <button type="submit"
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                  Post comment
                </button>
                <div class="flex pl-0 space-x-1 sm:pl-2">
                  <button type="button"
                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 12 20">
                      <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                        d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                    </svg>
                    <span class="sr-only">Attach file</span>
                  </button>
                  <button type="button"
                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                      viewBox="0 0 16 20">
                      <path
                        d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    <span class="sr-only">Set location</span>
                  </button>
                  <button type="button"
                    class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                      viewBox="0 0 20 18">
                      <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                    <span class="sr-only">Upload image</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <article class="p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                    class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough">Michael Gough</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                    title="February 8th, 2022">Feb. 8, 2022</time></p>
              </div>
              <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 16 3">
                  <path
                    d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span class="sr-only">Comment settings</span>
              </button>
              Dropdown menu
              <div id="dropdownComment1"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                  </li>
                </ul>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank
              you! But tools are just the
              instruments for the UX designers. The knowledge of the design tools are as important as the
              creation of the design strategy.</p>
            <div class="flex items-center mt-4 space-x-4">
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
                11 Likes
              </button>
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
                Reply
              </button>
            </div>
          </article>
          <article class="p-6 mb-6 ml-12 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                    class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Jese Leos">Jese Leos</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-12"
                    title="February 12th, 2022">Feb. 12, 2022</time></p>
              </div>
              <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 16 3">
                  <path
                    d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span class="sr-only">Comment settings</span>
              </button>
    
              <div id="dropdownComment2"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                  </li>
                </ul>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
            <div class="flex items-center mt-4 space-x-4">
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
                3 Likes
              </button>
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
                Reply
              </button>
            </div>
          </article>
          <article class="p-6 mb-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                    class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Bonnie Green">Bonnie Green</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                    title="March 12th, 2022">Mar. 12, 2022</time></p>
              </div>
              <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 16 3">
                  <path
                    d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span class="sr-only">Comment settings</span>
              </button>
              
              <div id="dropdownComment3"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                  </li>
                </ul>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages
              the UX designer should consider while creating the design strategy.</p>
            <div class="flex items-center mt-4 space-x-4">
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
                24 Likes
              </button>
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
                Reply
              </button>
            </div>
          </article>
          <article class="p-6 text-base bg-gray-50 rounded-lg dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                    class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Helene Engels">Helene Engels</p>
                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-06-23"
                    title="June 23rd, 2022">Jun. 23, 2022</time></p>
              </div>
              <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 16 3">
                  <path
                    d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
             
              <div id="dropdownComment4"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                  </li>
                  <li>
                    <a href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                  </li>
                </ul>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">Thanks for sharing this. I do came from the Backend development
              and explored some of the tools to design my Side Projects.</p>
            <div class="flex items-center mt-4 space-x-4">
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
                9 Likes
              </button>
              <button type="button"
                class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 20 18">
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
                Reply
              </button>
            </div>
          </article>
        </section>  -->
      </article>
      <aside class="hidden xl:block" aria-labelledby="sidebar-label">
        <div class="xl:w-[336px] sticky top-6">
          <h3 id="sidebar-label" class="sr-only">Sidebar</h3>
          <!-- <div class="mb-8">
            <h4 class="mb-2 text-sm font-bold text-gray-900 dark:text-white uppercase">
              {{ $t('blog_detail.newsletter_banner.title') }}
            </h4>
            <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">
              {{ $t('blog_detail.newsletter_banner.content') }}
            </p>
            <a type="button" data-modal-toggle="newsletter-modal" href="#subsciberSegment"
              class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 text-center w-full">
              {{ $t('blog_detail.newsletter_banner.subscribe_button_text') }}
            </a>
          </div> -->
          <div class="mb-12">
            <h4 class="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">Latest news</h4>
            <div class="mb-6 flex items-center" v-for="post in  items " :key="post.id">
              <!-- <a href="#" class="shrink-0"> -->
                <!-- <img :src="post.featured_image" class="mr-4 max-w-full  h-24 rounded-lg" alt="Image 1">
              </a> -->
              <div>
                <NuxtLink :to="localePath('/blog/'+post.slug)" class="shrink-0">
                <img :src="post.featured_image" class="mr-4 w-64 h-max-32 rounded-lg" alt="Image 1">
                </NuxtLink>
                <h5 class="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">{{ post.title }}</h5>
                <p class="mb-2 text-gray-500 dark:text-gray-400">{{ post.description }}</p>
                <NuxtLink :to="localePath('/blog/'+post.slug)"
                  class=" cursor-pointer inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                  Read
                </NuxtLink>
              </div>
            </div>

          </div>
          <!-- <div>
            <a href="#"
              class="flex justify-center items-center mb-3 w-full h-48 bg-gray-100 rounded-lg dark:bg-gray-700">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"></path>
              </svg>
            </a>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">Students and Teachers, save up to 60% on Flowbite
              Creative Cloud.</p>
            <p class="text-xs text-gray-400 uppercase dark:text-gray-500">Ads placeholder</p>
          </div> -->
        </div>
      </aside>
    </div>
  </main>


</template>