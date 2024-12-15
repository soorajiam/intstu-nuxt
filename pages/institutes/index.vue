<template>
  <div class="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
            Find Your Perfect University
          </h1>
          <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10">
            Compare top universities worldwide, create your personalized shortlist, and take the first step towards your dream education.
          </p>

          <!-- Search Section -->
          <div class="max-w-3xl mx-auto">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="md:w-1/3">
                <select v-model="selectedCountry" 
                  class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 dark:text-gray-200">
                  <option value="all">All Countries</option>
                  <option v-for="country in countries" :key="country[0]" :value="country[0]">
                    {{ country[1] }}
                  </option>
                </select>
              </div>
              
              <div class="md:w-2/3 relative">
                <input type="search" v-model="search"
                  class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 dark:text-gray-200"
                  :placeholder="$t('institute_list.search')">
                <button class="absolute right-3 top-1/2 -translate-y-1/2">
                  <i class="pi pi-search text-gray-400 dark:text-gray-300"></i>
                </button>
              </div>
            </div>

            <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {{ $t('institute_list.description') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 transform opacity-10 dark:opacity-5">
        <div class="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
      </div>
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 transform opacity-10 dark:opacity-5">
        <div class="w-72 h-72 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"></div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid gap-6">
        <div v-for="item in items" :key="item.id">
          <InstituteListDetail :item="item" @open-login-modal="openLoginModal" />
        </div>
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex flex-col items-center">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          <!-- <ClientOnly> -->
            Showing <span class="font-semibold">{{ (page - 1) * 10 + 1 }}</span> to <span class="font-semibold">{{ Math.min(page * 10, resultCount) }}</span> of <span class="font-semibold">{{ resultCount }}</span> Universities
          <!-- </ClientOnly> -->
        </span>
        
        <div class="mt-4 flex space-x-2">
          <ClientOnly>
            <Button @click="page = page > 1 ? page - 1 : 1"
              class="px-6 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
              Previous
            </Button>
            <Button @click="page = page < Math.ceil(resultCount/10) ? page + 1 : Math.ceil(resultCount/10)"
              class="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200">
              Next
          </Button>
          </ClientOnly>
        </div>
      </div>

        <!-- Search Tip -->
        <div class="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center transform hover:scale-[1.02] transition-all duration-300">
          <div class="max-w-2xl mx-auto">
            <h3 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Expand Your Academic Horizons
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Not seeing your dream institution? Our comprehensive database includes universities worldwide. Try refining your search above to discover more opportunities.
            </p>
            <button @click="window.scrollTo({top: 0, behavior: 'smooth'})"
              class="group inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 space-x-2">
              <i class="pi pi-search text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300"></i>
              <span class="text-blue-600 dark:text-blue-400 font-medium">Explore More Universities</span>
            </button>
          </div>
        </div>
      </div>
  </div>

  <!-- Login Modal -->
  <div v-if="showLoginModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Join Our Academic Community</h3>
        <div class="text-gray-600 dark:text-gray-300 mb-6">
          <p>Create your free account to unlock exclusive features:</p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center">
              <i class="pi pi-check text-green-500 mr-2"></i>
              Build your personalized university shortlist
            </li>
            <li class="flex items-center">
              <i class="pi pi-check text-green-500 mr-2"></i>
              Track application deadlines
            </li>
            <li class="flex items-center">
              <i class="pi pi-check text-green-500 mr-2"></i>
              Get tailored university recommendations
            </li>
          </ul>
        </div>
        
        <div class="flex justify-end space-x-4">
          <button @click="openLoginModal" class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            Cancel
          </button>
          <a href="/auth/signup/" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105">
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import debounce from 'lodash.debounce'
import { useNotificationStore } from '~/store/notificationStore'

const notificationStore = useNotificationStore()

if (process.client) {
  notificationStore.info('Welcome to Intstu!');
}

import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

const search = ref("");
const items = ref("");
const next = ref("");
const previous = ref("");
const page = ref(1);
const offset = computed(() => (page.value - 1) * 10);
const paginationLength = ref(1);
let url = ref("");

const showLoginModal = ref(false);

const countries = ref("");
const selectedCountry = ref("");
selectedCountry.value = "all";

useSeoMeta({
  title: 'Intstu - Institute List',
  ogTitle: 'Intstu - Institute List',
  description: 'Fins the best institutes to study. Compare, make a list and apply to the best institutes.',
  ogDescription: 'Fins the best institutes to study. Compare, make a list and apply to the best institutes.',
  ogImage: '/images/logo/intstu_logo.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Intstu - Institute List',
  twitterDescription: 'Fins the best institutes to study. Compare, make a list and apply to the best institutes.',
  twitterImage: '/images/logo/intstu_logo.png',

})

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

const resultCount = ref(0);
const getInstituteList = () => {
  //Function to handle registration
  items.value = [];
   url =
    "institutes/institutions/?limit=10" +
    "&offset=" +
    offset.value +
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
      next.value = response.data.next;
      previous.value = response.data.previous;
      resultCount.value = response.data.count;
      paginationLength.value = Math.ceil(resultCount.value / 10);
    })
    .catch((error) => {
      //console.log("Error");
    });

};


const ListInstitutes = async () => {
  const { data, pending, error } = await  useSsrfetch('institutes/institutions/', {
    query: {
      limit: '10',
      offset: offset.value,
      search: search.value,
      country: selectedCountry.value,
    },
  })

  if (!pending.value && !error.value) {
    items.value = data.value.data.results;
    next.value = data.value.next;
    previous.value = data.value.previous;
    resultCount.value = data.value.data.count;
    paginationLength.value = Math.ceil(resultCount.value / 10);
  }
}

const ssrListInstitutes = async () => {
  const { data, pending, error } = await useSsrfetch('institutes/institutions/', {
    query: {
      limit: '10',
      offset: offset.value,
      search: search.value,
      country: selectedCountry.value,
    }
  });
  if (!pending.value && !error.value) {
    items.value = data.value.data.results;
    next.value = data.value.data.next;
    previous.value = data.value.data.previous;
    resultCount.value = data.value.data.count;
    paginationLength.value = Math.ceil(resultCount.value / 10);
  }
};
ssrListInstitutes();
// offset = computed(() => (page.value - 1) * 10);
page.value = 1;


watch(page, async (newPage, oldPage) => {
  if (newPage !== oldPage) {
    try {
      ListInstitutes();
    } catch (error) {
      console.error(error);
    }
  }
});

watch(search, debounce(() => {
  try {
    page.value = 1;
    ssrListInstitutes();
  } catch (error) {
    console.error(error);
  }
}, 500))

watch(selectedCountry, async (newCountry, oldCountry) => {
  if (newCountry !== oldCountry) {
    try {
      page.value = 1;
      ssrListInstitutes();
    } catch (error) {
      console.error(error);
    }
  }
});

const openLoginModal = () => {
  showLoginModal.value = !showLoginModal.value;
};

</script>

<style>
/* Add PrimeVue component customizations if needed */
.p-dropdown {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.p-inputtext {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
