<template>
  <div>

    <div  id="crud-modal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Create List
                </h3>
                <button @click="$emit('close-modal'); console.log('clicked')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <form class="p-4 md:p-5">
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label 
                        
                        for="name" class="block mb-2 text-sm font-medium  ">Name</label>
                        <input v-model="title" type="text" name="name" id="name"
                          :class="isTitleValid ? 'border-green-500' : 'border-red-500'"
                         class="bg-gray-50 border  text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white " placeholder="Type product name" required="">
                    </div>
                   
                    <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea v-model="description" id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div>
                </div>
                <button 
                :class="isTitleValid ? 'bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300' : 'bg-gray-300'"
                @click="createListForUser"
                type="submit" class="text-white inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Add new List
                </button>
            </form>
        </div>
    </div>
</div>
    
  </div>
</template>

<script  setup>

const title = ref('')
const description = ref('')

const client = useSupabaseClient()
const user = useSupabaseUser()

const createListForUser = async () => {
  const { data, error } = await client.from('student_institution_list').insert([
    { title: title.value, description: description.value, user: user.value.id }
  ])
  if (error) {
    console.error(error)
  } else {
    console.log(data)
    title.value = ''
    description.value = ''
    $emit('close-modal')
  }
}

// computed which return if title has more tha 3 chars
const isTitleValid = computed(() => title.value.length > 3)




</script>

<style>

</style>