<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import debounce from 'lodash.debounce'
import { useThemeStore } from '~/store/themeStore';
import { useUserStore } from '~/store/userStore';
import { useNotificationStore } from '~/store/notificationStore';
import DOMPurify from 'isomorphic-dompurify'

const router = useRouter()
const notificationStore = useNotificationStore();
const themeStore = useThemeStore();
const userStore = useUserStore();
const route = useRoute()
const instituteSlug = ref(route.query.institute || null)
const institute = ref(null)

onMounted(async () => {
  if (instituteSlug.value) {
    // First set the search value from the URL parameter
    instituteSearch.value = decodeURIComponent(instituteSlug.value)
    
    // Then search for the institute using the decoded name
    const { data, pending, error } = await useSsrfetch('institutes/institutions/', {
      query: {
        limit: '10',
        search: instituteSearch.value
      }
    })

    if (!pending && !error && data.value?.data?.results?.length > 0) {
      // Find the exact match from results
      const matchedInstitute = data.value.data.results.find(
        inst => inst.name.toLowerCase() === instituteSearch.value.toLowerCase()
      )
      
      if (matchedInstitute) {
        // Set the form values using the matched institute
        form.value.institution = matchedInstitute.id
        instituteSearch.value = matchedInstitute.name
        institute.value = matchedInstitute
      }
    }
  }
})

const form = ref({
  title: '',
  category: '',
  content: '',
  tags: [],
  institution: '',
  institution_id: null,
  author: null
})

const instituteSearch = ref('')
const instituteResults = ref([])
const tagSearch = ref('')
const tagResults = ref([])
const categorySearch = ref('')
const categoryResults = ref([])

// Fetch institute search results
const searchInstitutes = async () => {
  if (!instituteSearch.value) {
    instituteResults.value = []
    return
  }

  const { data, pending, error } = await useSsrfetch('institutes/institutions/', {
    query: {
      limit: '10',
      search: instituteSearch.value
    }
  })

  if (!pending.value && !error.value) {
    instituteResults.value = data.value.data.results
  }
}

// Fetch tag search results
const searchTags = async () => {
  if (!tagSearch.value) {
    tagResults.value = []
    return
  }

  const { data, pending, error } = await useSsrfetch('discussion/tags/', {
    query: {
      search: tagSearch.value
    }
  })

  if (!pending.value && !error.value) {
    tagResults.value = data.value.data.results
  }
}

// Fetch category search results
const searchCategories = async () => {
  if (!categorySearch.value) {
    categoryResults.value = []
    return
  }

  const { data, pending, error } = await useSsrfetch('discussion/categories/', {
    query: {
      search: categorySearch.value
    }
  })

  if (!pending.value && !error.value) {
    categoryResults.value = data.value.data.results
  }
}

// Debounced searches
watch(instituteSearch, debounce(() => {
  searchInstitutes()
}, 500))

watch(tagSearch, debounce(() => {
  searchTags()
}, 500))

watch(categorySearch, debounce(() => {
  searchCategories() 
}, 500))

// Add sanitization function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [] // Strip all attributes
  }).trim()
}

const selectInstitute = (institute) => {
  form.value.institution = sanitizeInput(institute.id)
  instituteSearch.value = sanitizeInput(institute.name)
  instituteResults.value = []
}

const selectTag = (tag) => {
  if (!form.value.tags.some(existingTag => existingTag.id === tag.id)) {
    form.value.tags.push({
      id: tag.id,
      name: sanitizeInput(tag.name)
    })
  }
  tagSearch.value = ''
  tagResults.value = []
}

const selectCategory = (category) => {
  form.value.category = sanitizeInput(category.id)
  categorySearch.value = sanitizeInput(category.name)
  categoryResults.value = []
}

const removeTag = (tagToRemove) => {
  form.value.tags = form.value.tags.filter(tag => tag !== tagToRemove)
}

// Modify the submitDiscussion function
const submitDiscussion = async () => {
  try {
    // Validate required fields
    if (!form.value.title || !form.value.category || !form.value.content || !form.value.tags.length) {
      throw new Error('Please fill in all required fields')
    }

    // Sanitize the input data
    const sanitizedData = {
      ...form.value,
      title: sanitizeInput(form.value.title),
      content: sanitizeInput(form.value.content),
      tags: form.value.tags.map(tag => tag.id),
      institution: form.value.institution ? sanitizeInput(form.value.institution) : null
    }

    // Validate length constraints
    if (sanitizedData.title.length < 3 || sanitizedData.title.length > 200) {
      throw new Error('Title must be between 3 and 200 characters')
    }

    if (sanitizedData.content.length < 10 || sanitizedData.content.length > 50000) {
      throw new Error('Content must be between 10 and 50000 characters')
    }

    const { data, error } = await useSsrfetch('discussion/topics/', {
      method: 'POST',
      body: JSON.stringify(sanitizedData)
    })

    if (error.value) {
      throw error.value
    }

    notificationStore.success('Discussion created successfully!')
    router.push(`/discussion/${data.value.data.id}`)
  } catch (err) {
    console.error('Error creating discussion:', err)
    notificationStore.error(err.message || 'Error creating discussion')
  }
}

if (process.client) {
    form.value.author = userStore.user_id
    notificationStore.success('Welcome back!')
}

const categories = [
  {label: 'Choose a community', value: ''},
  {label: 'r/academics', value: 'academics'},
  {label: 'r/careerGuidance', value: 'career'},
  {label: 'r/campusLife', value: 'campus'},
  {label: 'r/studyTips', value: 'study-tips'},
  {label: 'r/learningResources', value: 'resources'},
  {label: 'r/technology', value: 'tech'}
]

definePageMeta({
  layout: 'dashboard',
  middleware: 'user-auth',
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
    <main class="max-w-4xl mx-auto p-6">
      <div class="flex items-center justify-between mb-8">
        <NuxtLink to="/discussion" class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <i class="pi pi-arrow-left mr-2"></i>
          <span class="font-medium">Back to Discussions</span>
        </NuxtLink>
        
        <Button 
          @click="themeStore.toggleTheme" 
          :icon="themeStore.isDark ? 'pi pi-moon' : 'pi pi-sun'" 
          class="p-button-rounded p-button-text hover:bg-slate-100 dark:hover:bg-slate-800"
          v-tooltip.bottom="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        />
      </div>

      <Card class="mb-8 shadow-sm border border-slate-200 dark:border-slate-700">
        <template #content>
          <div class="flex items-start p-4 bg-blue-50/50 dark:bg-slate-800/50 rounded-lg">
            <i class="pi pi-info-circle text-3xl text-blue-600 dark:text-blue-400 mr-4"></i>
            <div>
              <h3 class="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Posting Guidelines</h3>
              <ul class="space-y-2 text-slate-700 dark:text-slate-300">
                <li class="flex items-center">
                  <i class="pi pi-check-circle mr-2 text-emerald-500 dark:text-emerald-400"></i>
                  Remember to follow our community guidelines
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check-circle mr-2 text-emerald-500 dark:text-emerald-400"></i>
                  Be respectful and constructive in discussions
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check-circle mr-2 text-emerald-500 dark:text-emerald-400"></i>
                  Use clear titles and relevant tags
                </li>
                <li class="flex items-center">
                  <i class="pi pi-check-circle mr-2 text-emerald-500 dark:text-emerald-400"></i>
                  Search before posting to avoid duplicates
                </li>
              </ul>
            </div>
          </div>
        </template>
      </Card>

      <Card class="shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <template #title>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Create a Post</h1>
          <p class="text-sm text-slate-600 dark:text-slate-400">Share your thoughts with the community</p>
        </template>
        <template #content>
          <form @submit.prevent="submitDiscussion" class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title*</label>
              <InputText
                id="title"
                v-model="form.title"
                placeholder="Enter a descriptive title"
                class="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-900"
                required
              />
            </div>

            <div>
              <label for="content" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content*</label>
              <Textarea
                id="content"
                v-model="form.content"
                rows="8"
                placeholder="What would you like to discuss?"
                class="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-900"
                required
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="category" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category*</label>
                <AutoComplete
                  id="category"
                  v-model="categorySearch"
                  :suggestions="categoryResults"
                  field="label"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Search for a community"
                  class="w-full"
                  :panelClass="'max-w-[calc(100vw-2rem)] md:max-w-[400px] min-w-[280px] bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-lg rounded-lg'"
                  @complete="searchCategories"
                  @item-select="selectCategory($event.value)"
                  required
                >
                  <template #item="{ item }">
                    <div class="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                      <div class="flex items-center flex-1 min-w-0">
                        <div class="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mr-3">
                          <i class="pi pi-users text-blue-500 dark:text-blue-400"></i>
                        </div>
                        <div class="truncate">
                          <div class="font-medium text-slate-900 dark:text-slate-200 truncate">{{ item.name }}</div>
                          <small class="text-slate-500 dark:text-slate-400 truncate block">{{ item.description || 'Community' }}</small>
                        </div>
                      </div>
                    </div>
                  </template>
                </AutoComplete>
              </div>

              <div>
                <label for="institution" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Institution (Optional)</label>
                <AutoComplete
                  id="institution.id"
                  v-model="instituteSearch"
                  :suggestions="instituteResults"
                  field="name"
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Search for an institution"
                  class="w-full"
                  :panelClass="'max-w-[calc(100vw-2rem)] md:max-w-[400px] min-w-[280px] bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-lg rounded-lg'"
                  @complete="searchInstitutes"
                  @item-select="selectInstitute($event.value)"
                >
                  <template #item="{ item }">
                    <div class="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                      <div class="flex items-center flex-1 min-w-0">
                        <div class="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 mr-3">
                          <i class="pi pi-building text-indigo-500 dark:text-indigo-400"></i>
                        </div>
                        <div class="truncate">
                          <div class="font-medium text-slate-900 dark:text-slate-200 truncate">{{ item.name }}</div>
                          <small class="text-slate-500 dark:text-slate-400 truncate block">{{ item.location || 'Institution' }}</small>
                        </div>
                      </div>
                    </div>
                  </template>
                </AutoComplete>
              </div>
            </div>

            <div>
              <label for="tags" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tags*</label>
              <AutoComplete
                id="tags"
                v-model="tagSearch"
                :suggestions="tagResults"
                optionLabel="name"
                optionValue="id"
                placeholder="Search and add tags"
                class="w-full"
                :panelClass="'max-w-[calc(100vw-2rem)] md:max-w-[400px] min-w-[280px] bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-lg rounded-lg'"
                @complete="searchTags"
                @item-select="selectTag($event.value)"
                required
              >
                <template #item="{ item }">
                  <div class="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                    <div class="flex items-center flex-1 min-w-0">
                      <div class="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 mr-3">
                        <i class="pi pi-tag text-emerald-500 dark:text-emerald-400"></i>
                      </div>
                      <div class="truncate">
                        <div class="font-medium text-slate-900 dark:text-slate-200 truncate">{{ item.name }}</div>
                        <small class="text-slate-500 dark:text-slate-400 truncate block">{{ item.count || 0 }} posts</small>
                      </div>
                    </div>
                  </div>
                </template>
              </AutoComplete>

              <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2 mt-3">
                <Chip
                  v-for="tag in form.tags"
                  :key="tag"
                  :label="tag.name"
                  class="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200"
                  removable
                  @remove="removeTag(tag)"
                />
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
              <div class="flex space-x-2">
                <Button 
                  type="button" 
                  icon="pi pi-image" 
                  label="Add Image"
                  class="p-button-text hover:bg-slate-100 dark:hover:bg-slate-700"
                />
                <Button
                  type="button"
                  icon="pi pi-link"
                  label="Add Link" 
                  class="p-button-text hover:bg-slate-100 dark:hover:bg-slate-700"
                />
              </div>
              
              <div class="flex space-x-3">
                <Button
                  type="button"
                  label="Cancel"
                  class="p-button-secondary dark:bg-slate-700 dark:hover:bg-slate-600"
                  @click="$router.push('/discussion')"
                />
                <Button
                  type="submit"
                  label="Post Discussion"
                  icon="pi pi-send"
                  class="p-button-primary bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                />
              </div>
            </div>
          </form>
        </template>
      </Card>

      <div v-if="institute" class="mb-4">
        <div class="text-sm text-gray-500">
          Creating discussion for:
          <span class="font-medium text-gray-700 dark:text-gray-300">{{ institute.name }}</span>
        </div>
      </div>
    </main>
  </div>
</template>