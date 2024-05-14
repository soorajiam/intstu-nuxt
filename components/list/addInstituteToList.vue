<template>
  <div>
    <div id="crud-modal" tabindex="-1" aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Add Institute to List 
            </h3>
            <button @click="$emit('close-modal'); console.log('clicked')" type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal </span>
            </button>
          </div>
          <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium">University</label>
                <input v-model="search" @input="fetchSuggestions" type="text" name="name" id="name"
                  class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Type product Institution name" required="">
                <div v-if="suggestions.length">
                  <div v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
                    class="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-500">
                    {{ suggestion.name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex">
              <!-- 3 radio buttons with add to last, first and custom -->
              <div class="flex items-center my-2 gap-3">
                <input v-model="positionSelector" type="radio" id="first" name="position" value="last" checked>
                <label for="first" class="ml-2 text-sm font-medium">Add to Last</label>
                <input  v-model="positionSelector" type="radio" id="first" name="position" value="first" checked>
                <label for="first" class="ml-2 text-sm font-medium">Add to First</label>
                <input  v-model="positionSelector" type="radio" id="first" name="position" value="custom" checked>
                <label for="first" class="ml-2 text-sm font-medium">Add to Custom</label>
                </div>

            </div>
            <input type="number" v-if="positionSelector === 'custom'" v-model="customPosition" class="bg-gray-50 my-2 border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Type position" required="">
            <button @click.prevent="addToList"
              :class="selectedInstitution > 0 ? 'bg-blue-500  focus:ring-4 focus:outline-none focus:ring-blue-300' : 'bg-gray-300'"
              type="submit"
              class="text-white inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"></path>
              </svg>
              Add to List
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';

const emit = defineEmits(['close-modal']);

const search = ref('');
const suggestions = ref([]);
const client = useSupabaseClient()
const user = useSupabaseUser()
const selectedInstitution = ref(0);

const positionSelector = ref('last');
const customPosition = ref(1);

const props = defineProps({
  id: Number,
});

const fetchSuggestions = async () => {
  if (search.value.length > 2) {
    // Fetch suggestions from an API
    // suggestions.value = ['Institute 1', 'Institute 2', 'Institute 3'];

    try {
      const data = await client
        .from('supabase_institution')
        .select('id, name)', { count: 'exact' })
        .ilike('name', `%${search.value}%`)
        .limit(5);

      suggestions.value = data.data;
      console.log(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  } else {
    suggestions.value = [];
  }
};

const addToList = async () => {
  console.log(selectedInstitution.value, 'Testing: :')
  if (search.value.length > 2) {
    // Fetch suggestions from an API

    try {

      if (positionSelector.value === 'last') {
        const { data, error } = await client
          .from('student_shortlisted_institutes')
          .select('current_position', { count: 'exact' })  // 'count' is a second parameter to the 'select' method
          .eq('user', user.value.id)
          .eq('list', props.id)
          .order('current_position', { ascending: false })
          .limit(1);
        console.log(data);
        let lastPosition
        if (data.length === 0){
           lastPosition = 0;
        } else {
           lastPosition = data[0].current_position;
        }
        
        console.log("check")
        if (data.length > 0) {
          
          const data = await client
            .from('student_shortlisted_institutes')
            .insert([
              {
                current_position: lastPosition + 1,
                note: '',
                list: props.id,
                created_at: new Date(),
                institute: selectedInstitution.value,
                user: user.value.id,
                highlight: false
              }
            ]);
        } else {
          const data = await client
            .from('student_shortlisted_institutes')
            .insert([
              {
                current_position: 0,
                note: '',
                list: props.id,
                created_at: new Date(),
                institute: selectedInstitution.value,
                user: user.value.id,
                highlight: false
              }
            ]);
        }
      } else if (positionSelector.value === 'first') {
        const { data, error } = await client
          .from('student_shortlisted_institutes')
          .select('current_position', { count: 'exact' })  // 'count' is a second parameter to the 'select' method
          .eq('user', user.value.id)
          .eq('list', props.id)
          .order('current_position', { ascending: true })
          .limit(1);
        console.log(data);
        console.log("check")
        if (data.length > 0) {
          const firstPosition = 1
          const data = await client
            .from('student_shortlisted_institutes')
            .insert([
              {
                current_position: firstPosition - 1,
                note: '',
                list: props.id,
                created_at: new Date(),
                institute: selectedInstitution.value,
                user: user.value.id,
                highlight: false
              }
            ]); 
        } else {
          const data = await client
            .from('student_shortlisted_institutes')
            .insert([
              {
                current_position: 0,
                note: '',
                list: props.id,
                created_at: new Date(),
                institute: selectedInstitution.value,
                user: user.value.id,
                highlight: false
              }
            ]);
        }

        // sum + 1 to all the positions above the first position
        const { data: data2, error: error2 } = await client
          .from('student_shortlisted_institutes')
          .select('id, current_position', { count: 'exact' })  // 'count' is a second parameter to the 'select' method
          .eq('user', user.value.id)
          .eq('list', props.id)
          .gt('current_position', 0)
          .order('current_position', { ascending: true })
          .limit(1000);
        console.log(data2);
        console.log("check")
        if (data2.length > 0) {
          for (let i = 0; i < data2.length; i++) {
            const data = await client
              .from('student_shortlisted_institutes')
              .update({ current_position: data2[i].current_position + 1 })
              .eq('id', data2[i].id);
          }
        }
      } else if (positionSelector.value === 'custom') {
        const data = await client
          .from('student_shortlisted_institutes')
          .insert([
            {
              current_position: customPosition.value,
              note: '',
              list: props.id,
              created_at: new Date(),
              institute: selectedInstitution.value,
              user: user.value.id,
              highlight: false
            }
          ]);

          // sum + 1 to all the positions above the custom position
          const { data: data2, error: error2 } = await client
          .from('student_shortlisted_institutes')
          .select('id, current_position', { count: 'exact' })  // 'count' is a second parameter to the 'select' method
          .eq('user', user.value.id)
          .eq('list', props.id)
          .gt('current_position', customPosition.value)
          .order('current_position', { ascending: true })
          .limit(1000);
          console.log(data2);
          console.log("check")
          if (data2.length > 0) {
            for (let i = 0; i < data2.length; i++) {
              const data = await client
                .from('student_shortlisted_institutes')
                .update({ current_position: data2[i].current_position + 1 })
                .eq('id', data2[i].id);
            }
          }
      }

    
      emit('close-modal');

    } catch (err) {
      console.error('Error create data:', err);
    }
  } else {
    suggestions.value = [];
  }
};

const selectSuggestion = (suggestion) => {
  search.value = suggestion.name;
  suggestions.value = [];
  selectedInstitution.value = suggestion.id;
  console.log(props.id)

};
</script>

<style>
/* Optional: Add styles for the suggestions dropdown */
</style>
