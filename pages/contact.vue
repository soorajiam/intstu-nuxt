<template>
  <section class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 mb-6">
          Let's Build the Future of Education Together
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Whether you're an educational institution looking to expand your reach or a student eager to join our community, we're here to help.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 mb-16">
        <!-- For Institutions -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div class="mb-8">
            <span class="bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300">For Institutions</span>
            <h2 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Partner With Us</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Ready to showcase your institution to a global audience? Let's connect and explore how we can help expand your reach.</p>
          </div>

          <form class="space-y-4">
            <div>
              <input v-model="institutionDetails.institution_name" type="text" placeholder="Institution Name" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div>
              <input @input="validateInstitutionEmail" v-model="institutionDetails.work_email" type="email" placeholder="Work Email" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div>
              <input v-model="institutionDetails.your_name" type="text" placeholder="Your Name" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <div>
              <input v-model="institutionDetails.phone_number" type="tel" placeholder="Phone Number" class="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            </div>
            <p v-if="institutionErrorMessage" class="text-red-500 text-sm">{{ institutionErrorMessage }}</p>
            <NuxtTurnstile v-if="institutionDetails.work_email.length>2" v-model="institutionToken" class="mb-4" />
            
            <button @click.prevent="handleInstitutionSubmit" :disabled="institutionErrorMessage || !institutionToken" class="w-full py-3 px-6 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium transition-colors">
              Get in Touch
            </button>
          </form>
        </div>

        <!-- For Students -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
          <div class="mb-8">
            <span class="bg-green-50 text-green-600 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-900/30 dark:text-green-300">For Students</span>
            <h2 class="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Join Our Thriving Student Community</h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Get personalized guidance, connect with universities worldwide, and access exclusive resources to make your study abroad dreams a reality.</p>
          </div>

          <div class="space-y-6">
            <div class="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Direct messaging with universities</span>
            </div>
            <div class="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Personalized program recommendations</span>
            </div>
            <div class="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Application tracking & support</span>
            </div>

            <div class="pt-4">
              <NuxtLink to="/auth/signup" class="block w-full py-3 px-6 text-center text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-medium transition-colors">
                Create Free Account
              </NuxtLink>
              <p class="text-sm text-center text-gray-500 dark:text-gray-400 mt-3">
                Join thousands of students who've found their perfect university match
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const institutionDetails = ref({
  institution_name: '',
  work_email: '',
  your_name: '',
  phone_number: ''
});

const institutionToken = ref('');
const institutionErrorMessage = ref('');

function validateInstitutionEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(institutionDetails.value.work_email)) {
    institutionErrorMessage.value = '';
  } else {
    institutionErrorMessage.value = 'Please enter a valid email address';
  }
}

const handleInstitutionSubmit = async () => {
  try {
    if (institutionErrorMessage.value || !institutionToken.value) return;
    const response = await useCustomFetch('marketing/request-callback/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: institutionDetails.value.work_email,
        name: institutionDetails.value.your_name,
        phone: institutionDetails.value.phone_number,
        message: institutionDetails.value.institution_name,
        call_back_type: 'contact'
      }),
    });
    if (response.code === 200 || response.code === 201) {
      institutionDetails.value = {
        institution_name: '',
        work_email: '',
        your_name: '',
        phone_number: ''
      };
      alert('Thank you for reaching out! We will contact you soon.');
    }
  } catch (error) {
    institutionErrorMessage.value = "An error occurred. Please try again.";
  }
};
</script>
