<template>
  <section class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Success Modal -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full mx-4 transform transition-all animate-fade-in-up">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">You're All Set! 🎉</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for taking the first step towards transforming your institution's global presence. Our team will contact you within 24 hours to schedule your personalized demo.
            </p>
            <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 class="font-semibold text-blue-800 dark:text-blue-300 mb-2">What's Next?</h3>
              <ul class="text-left text-sm text-blue-700 dark:text-blue-200 space-y-2">
                <li class="flex items-center">
                  <span class="w-5 h-5 bg-blue-200 dark:bg-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">1</span>
                  Check your email ({{ details.work_email }}) for confirmation
                </li>
                <li class="flex items-center">
                  <span class="w-5 h-5 bg-blue-200 dark:bg-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">2</span>
                  Prepare your questions about international student recruitment
                </li>
                <li class="flex items-center">
                  <span class="w-5 h-5 bg-blue-200 dark:bg-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">3</span>
                  Get ready to revolutionize your global outreach strategy
                </li>
              </ul>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="navigateTo('/international-recruitment')" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Explore Resources
              </button>
              <button @click="closeSuccess" class="px-6 py-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Rest of the content -->
      <div v-show="!showSuccess">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 mb-6">
            Take Control of Your Institution's Digital Presence
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with international students directly and showcase your institution's unique value proposition on Intstu's leading educational platform.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-4 gap-8 mb-16">
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Enhanced Visibility</h3>
            <p class="text-gray-600 dark:text-gray-400">Reach millions of prospective international students actively searching for educational opportunities.</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Verified Profile</h3>
            <p class="text-gray-600 dark:text-gray-400">Build trust with a verified institution profile and showcase your programs authentically.</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Analytics & Insights</h3>
            <p class="text-gray-600 dark:text-gray-400">Access detailed analytics about student engagement and interest in your programs.</p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Targeted Advertising</h3>
            <p class="text-gray-600 dark:text-gray-400">Reach specific student demographics and appear on relevant institution pages.</p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Expand Your Global Reach?</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Schedule a demo to see how Intstu can help you connect with qualified international students and streamline your recruitment process.</p>
              <div class="space-y-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">Dedicated Institution Dashboard</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">Direct Student Inquiries</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">Content Management Tools</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">Targeted Advertising Platform</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Book a Demo</h3>
              <form class="space-y-4">
                <div>
                  <input v-model="details.institution_name" type="text" placeholder="Institution Name" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <input @input="validateEmail" v-model="details.work_email" type="email" placeholder="Work Email" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <input v-model="details.your_name" type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <div>
                  <input v-model="details.phone_number" type="tel" placeholder="Phone Number" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
                <p v-if="error_message" class="text-red-500">{{ error_message }}</p>
                <NuxtTurnstile v-if="details.work_email.length>2" v-model="token" class="mb-4" />
               
                <button @click.prevent="handleSubmit" :disabled="error_message || !token" class="cursor-pointer w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium transition-colors">
                  Schedule Demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()
const showSuccess = ref(false);

const details = ref({
  institution_name: '',
  work_email: '',
  your_name: '',
  phone_number: '',
  institution_website: ''
});

details.value.institution_name = route.query.institution_name;

const token = ref('');
const error_message = ref('');

function validateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details.value.work_email)) {
    error_message.value = '';
  } else {
    error_message.value = 'Please enter a valid email address';
  }
}

const turnstile_validated = ref(false);

const handleSubmit = async () => {
  try {
    validateTurnstile();
    if (error_message.value || !token.value) return;
    const response = await useCustomFetch('marketing/request-callback/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.value.work_email,
        name: details.value.your_name,
        phone: details.value.phone_number,
        message: details.value.institution_name,
        call_back_type: 'demo'
      }),
    });
    if (response.code === 200 || response.code === 201) {
      showSuccess.value = true;
    }
  } catch (error_obj) {
    error_message.value = "Error while submitting request"
  }
};

const closeSuccess = () => {
  showSuccess.value = false;
  navigateTo('/');
}

const validateTurnstile = async () => {
  try {
    const { data, error } = await useFetch('/_turnstile/validate', {
      method: 'POST',
      body: { token: token }
    });

    if (error.value) {
      error_message.value = 'Validation failed. Please try again.';
      turnstile_validated.value = false;
    } else {
      console.log('Validation successful: ' + data.value.message);
      turnstile_validated.value = true;
      error_message.value = '';
    }
  } catch (err) {
    error_message.value = 'Error: ' + err.message;
    turnstile_validated.value = false;
  }
};
</script>