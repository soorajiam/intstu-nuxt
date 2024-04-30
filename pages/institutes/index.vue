<script setup>
import { ref, watch } from "vue";
import debounce from 'lodash.debounce'

var search = ref("");
var items = ref("");
var next = ref("");
var previous = ref("");
const offset = computed(() => page.value * 10);
let paginationLength = ref(1);
let page = ref(1);

let countries = ref("");
let selectedCountry = ref("");
selectedCountry.value = "all";

const route = useRoute();
if (route.query.page) {
  page.value = parseInt(route.query.page);

}

  const response = useCustomFetch('country/dropdown/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
        countries.value = response.data.countries;
    })
    .catch((error) => {
      //console.log("Error");
    });

var resultCount = ref(0);
const getInstituteList = () => {
  //Function to handle registration
  items.value = [];

  let url =
    "institutes/institutions/?limit=10&" +
    "&offset=" +
    offset.value +
    "&limit=" +
    "10" +
    "&search=" +
    search.value +
    "&country=" +
    selectedCountry.value;
  const response = useCustomFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      items.value = response.data.results;
      //console.log(response);
      //console.log(items);
      next.value = response.data.next;
      previous.value = response.data.previous;
      resultCount.value = response.data.count;
      paginationLength.value = Math.ceil(resultCount.value / 10) - 1;
    })
    .catch((error) => {
      //console.log("Error");
    });

};


const ListInstitutes = async () => {
  const { data, pending, error } = await  useAPIFetch('institutes/institutions/', {
    query: {
      limit: '12',
      offset: offset.value,
      search: search.value,
      country: selectedCountry.value,
    },
  })

// To process the data after it's fetched
if (!pending.value && !error.value) {
  items.value = data.value.data.results;
  //console.log("---DATA---")
  //console.log(data);
  // Uncomment and adapt if needed
  // items.value.forEach(item => {
  //   item.published_on = dayjs.unix(item.published_on).format("MMMM DD, YYYY");
  // });
  next.value = data.value.next;
  previous.value = data.value.previous;
  resultCount.value = data.value.data.count;
  paginationLength.value = Math.ceil(resultCount.value / 12) - 1;
}

}

ListInstitutes();

const nextPage = () => {
  if (next.value) {
    offset.value = offset.value + 10;
    page.value = page.value + 1;
    // getInstituteList();
  }
};

const previousPage = () => {
  if (previous.value) {
    offset.value = offset.value - 10;
    page.value = page.value - 1;
    // getInstituteList();
  }
};

watch(page, async (newPage, oldPage) => {
  if (newPage !== oldPage) {
    try {
      offset.value = newPage * 10; // Reset offset when search changes
      getInstituteList();
    } catch (error) {
      console.error(error);
    }
  }
});

// watch(search, async (newSearch, oldSearch) => {
//   if (newSearch !== oldSearch) {
//     try {
//       offset.value = 0; // Reset offset when search changes
//       page.value = 1; // Reset page when search changes
//       getInstituteList();
//     } catch (error) {
//       console.error(error);
//     }
//   }
// });

watch(search, debounce(() => {
  try {
    offset.value = 0; // Reset offset when search changes
    page.value = 1; // Reset page when search changes
    getInstituteList();
  } catch (error) {
    console.error(error);
  }
}, 500))

watch(selectedCountry, async (newCountry, oldCountry) => {
  if (newCountry !== oldCountry) {
    try {
      offset.value = 0; // Reset offset when search changes
      page.value = 1; // Reset page when search changes
      getInstituteList();
    } catch (error) {
      console.error(error);
    }
  }
});

</script>

<template>
    <div class="conatiner mx-auto p-4 dark:bg-gray-900">
    <div class="relative w-full  h-64">
      <h1 class=" pt-12 text-center text-black dark:text-gray-100 text-3xl">
        {{$t('institute_list.title')}}
      </h1>

      <div class="absolute inset-x-0 bottom-0 h-32  p-4 md:w-2/3 md:mx-auto">
        <form>
          <div class="flex mx-auto md:w-2/3 md:mx-auto">
            <div class="  w-64 relative inline-flex text-left">
              <select id="dropdown-search-city" v-model="selectedCountry"
                class="w-full py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                <option value="all">All</option>
                <option v-for="country in countries" :key="country[0]" :value="country[0]">
                  {{ country[1] }}
                </option>

                <!-- Add more options with icons here -->
              </select>

            </div>
            <div class="relative w-full">
              <input type="search" id="location-search" v-model="search"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                :placeholder="$t('institute_list.search')" required>
              <button type="submit"
                class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <p class="p-2 text-center text-gray-900 dark:text-gray-100"> {{$t('institute_list.description')}}</p>
      </div>
    </div>
    <div class="flex flex-col md:grid md:grid-cols-1 gap-4 mt-6 md:w-full container mx-auto xl:w-4/5">



      <div v-for="item in items" :key="item.id">
        <InstituteListDetail :item="item" />
      </div>


      <div class="flex flex-col items-center mt-8">
      <!-- Help text -->
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing <span class="font-semibold text-gray-900 dark:text-white">{{ offset }}</span> to <span
          class="font-semibold text-gray-900 dark:text-white">{{ (offset + 10) }}</span> of <span
          class="font-semibold text-gray-900 dark:text-white">{{ resultCount }}</span> Entries
      </span>
      <!-- Buttons -->
      <div class="inline-flex mt-2 xs:mt-0">
        <a :href="page > 1 ? localePath({ query: { page: page - 1 } }) : ''"
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 rounded-l hover:bg-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
        </a>
        <a :href="page <= (resultCount/10) ? localePath({ query: { page: page + 1 } }) : ''"
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-black bg-gray-200 border-0 border-l border-gray-700 rounded-r hover:bg-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </a>
      </div>

      
    </div>



    </div>
    
  </div>
</template>
