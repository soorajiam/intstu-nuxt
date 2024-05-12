<script setup>

import { PlusIcon } from '@heroicons/vue/20/solid'
import { list } from 'postcss';

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
const localePath = useLocalePath()
const client = useSupabaseClient()
const user = useSupabaseUser()
const showCreateModal = ref(false)
const error = ref('')
// const lists = ref([])


const { data: lists } = useAsyncData('lists', async () => {
  let { data, error } = await client
    .from('student_institution_list')
    .select('title, description, id, student_shortlisted_institutes!list(count)')
    .eq('user', user.value.id);

  if (error) throw error;
  console.log(data)
  return data;

},
{
  lazy: true,
}

);

const openCreateListModal = () => {

  if (lists.value.length >= 5) {
    error.value = 'You can only create 5 lists'
    return
  }
  showCreateModal.value = !showCreateModal.value
}



</script>

<template>

<NavsBreadcrumbs :navs="[
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Lists', link: '#' },
]" />
  <!--Use openCreateList emit to open and clode-->
  <ListCreateList v-if="showCreateModal" @close-modal="openCreateListModal" />

  <!-- <p>{{ lists }}</p> -->



  <div class="w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto mt-6">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-200">Your Lists</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5">Lists are a way to group your favorite Institutes</p>
    <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
    <ul role="list" class="divide-y  overflow-hidden bg-white dark:bg-gray-900 shadow-sm  ring-gray-900 sm:rounded-xl">

      <li
        class="text-center relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 dark:hover:bg-gray-900 sm:px-6">

        <button @click="openCreateListModal" type="button"
          class="text-white bg-blue-500 hover:bg-[blue-300 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
          <PlusIcon class="h-5 w-5 mr-2" aria-hidden="true" />
          Create a new List
        </button>

      </li>
      <li v-for="list in lists" :key="list.id"
        class="relative flex justify-between  px-4 py-5 hover:bg-gray-50 dark:hover:bg-gray-800 sm:px-6">
        <!-- <p>{{ localePath('/dashboard/list/' + list.id + '/view') }}</p> -->
        <a :href="localePath('/dashboard/list/' + list.id + '/view')" class="flex min-w-0 gap-x-4">
          <!-- <img class="h-12 w-12 flex-none rounded-full bg-gray-50"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""> -->
          <div class="min-w-0 flex-auto">
            <p class="text-ld font-semibold leading-6 ">
              <a :href="localePath('/dashboard/list/' + list.id + '/view')">
                <span class="absolute inset-x-0 -top-px bottom-0"></span>
                {{ list.title }}
              </a>
            </p>
            <p class="mt-1 flex text-base  text-gray-500">
            <p class="relative ">{{ list.description }}</p>
            </p>
          </div>
        </a>
        <div class="flex shrink-0 items-center gap-x-4">
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 "><span class="font-bold"> {{ list.student_shortlisted_institutes[0].count }}
              </span> Institutes</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">Last edited <time datetime="2023-01-23T13:23Z">3h ago</time>
            </p>
          </div>
          <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </li>



    </ul>

  </div>



  <!-- <p>{{ user }}</p> -->
</template>
