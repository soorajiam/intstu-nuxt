<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 mb-6">
        Welcome to Intstu Beta!
      </h1>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-8">
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Hi {{ userStore.getFirstName }}, we're excited to have you here! 🎉
          </p>

          <p class="text-gray-600 dark:text-gray-300 mb-4">
            We're currently in beta, and we've enabled two core modules for you to explore:
          </p>

          <ul class="text-left text-gray-600 dark:text-gray-300 space-y-3 mb-6">
            <li class="flex items-center">
              <span class="text-green-500 mr-2">✓</span> <strong>Institutes Module:</strong> <NuxtLink to="/institutes" class="text-blue-600 dark:text-blue-400 hover:underline">Browse and learn about different educational institutions</NuxtLink>
            </li>
            <li class="flex items-center">
              <span class="text-green-500 mr-2">✓</span> <strong>Discussion Module:</strong> <NuxtLink to="/discussion" class="text-blue-600 dark:text-blue-400 hover:underline">Engage in conversations about institutions and education</NuxtLink>
            </li>
          </ul>

          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Feel free to explore these features and share your thoughts with us. More modules are coming soon!
          </p>
        </div>

        <div class="mt-8 space-y-4">
          <p class="text-gray-600 dark:text-gray-300">Help us improve by sharing your experience:</p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="showFeedbackModal = true"
               class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <i class="pi pi-envelope mr-2"></i>
              Send Feedback
            </button>
            
            <a href="https://twitter.com/intent/tweet?text=I'm exploring @intstu's new platform for education! Join me in the beta 🎓" 
               target="_blank"
               class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <i class="pi pi-twitter mr-2"></i>
              Share on Twitter
            </a>
          </div>
        </div>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        More features coming soon! Stay tuned.
      </p>
    </div>

    <!-- Feedback Modal -->
    <div v-if="showFeedbackModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-lg w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Send Feedback</h2>
          <button @click="showFeedbackModal = false" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <i class="pi pi-times"></i>
          </button>
        </div>

        <form class="space-y-4">
          <div>
            <input v-model="feedbackDetails.your_name" type="text" placeholder="Name" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <input v-model="feedbackDetails.work_email" type="email" placeholder="Email" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          <div>
            <textarea v-model="feedbackDetails.message" placeholder="Your feedback" rows="4" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          
          <p v-if="feedbackErrorMessage" class="text-red-500 text-sm">{{ feedbackErrorMessage }}</p>
          <NuxtTurnstile v-if="feedbackDetails.message.length > 2" v-model="feedbackToken" class="mb-4" />
          
          <button @click.prevent="handleFeedbackSubmit" :disabled="!feedbackToken" class="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium transition-colors">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
const userStore = useUserStore();

const showFeedbackModal = ref(false);
const feedbackToken = ref('');
const feedbackErrorMessage = ref('');

const feedbackDetails = ref({
  your_name: userStore.getFirstName + ' ' + userStore.getLastName,
  work_email: userStore.getUser,
  message: '',
});

const handleFeedbackSubmit = async () => {
  try {
    if (!feedbackToken.value) return;
    
    const response = await useCustomFetch('marketing/request-callback/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: feedbackDetails.value.work_email,
        name: feedbackDetails.value.your_name,
        message: feedbackDetails.value.message,
        call_back_type: 'contact'
      }),
    });

    if (response.code === 200 || response.code === 201) {
      feedbackDetails.value.message = '';
      showFeedbackModal.value = false;
      alert('Thank you for your feedback! We appreciate your input.');
    }
  } catch (error) {
    feedbackErrorMessage.value = "An error occurred. Please try again.";
  }
};

definePageMeta({
  layout: 'dashboard',
  middleware: 'user-auth',
});
</script>