<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <img class="h-12 mx-auto" src="/images/logo/intstu_logo.png" alt="Intstu Logo">
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Start Your Journey Today
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join thousands of students who've found their perfect study abroad program
        </p>
      </div>

      <div class="mt-8">
        <!-- Google Sign Up -->
        <button class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <img src="" alt="Google" class="w-5 h-5">
          <span class="text-gray-700 dark:text-gray-300 font-medium">Sign up with Google</span>
        </button>

        <div class="mt-6 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or sign up with email</span>
          </div>
        </div>

        <form class="mt-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="first_name">
                First Name
              </label>
              <input
                v-model="first_name"
                id="first_name"
                type="text"
                required
                placeholder="John"
                class="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="last_name">
                Last Name
              </label>
              <input
                v-model="last_name"
                id="last_name"
                type="text"
                required
                placeholder="Doe"
                class="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="email">
              Email address
            </label>
            <input
              v-model="email"
              @blur="validateEmail"
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              class="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="password">
              Password
            </label>
            <input
              v-model="password"
              @blur="validatePassword"
              id="password"
              type="password"
              required
              placeholder="••••••••"
              class="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the <a href="#" class="text-blue-600">Terms</a> and <a href="#" class="text-blue-600">Privacy Policy</a>
              </label>
            </div>
          </div>

          <div>
            <p v-if="error_message" class="text-red-500 text-sm mb-4">{{ error_message }}</p>
            <NuxtTurnstile v-if="password.length>2" v-model="token" class="mb-4" />
            
            <button
              type="button"
              @click="handleSignup"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink
            :to="localePath('/auth/login/')"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </NuxtLink>
        </p>
      </div>

      <!-- Trust Indicators -->
      <div class="mt-8 grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">10K+</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Students Helped</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">50+</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Countries</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">95%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

const localePath = useLocalePath();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const first_name = ref('');
const last_name = ref('');
const error_message = ref('');
const token = ref('');

if (process.client) {
  if(userStore.isLoggedIn) {
    navigateTo(localePath('/dashboard'))
  }
}

function validateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    error_message.value = '';
  } else {
    error_message.value = 'Please enter a valid email address';
  }
}

function validatePassword() {
  if (password.value.length < 8) {
    error_message.value = 'Password must be at least 8 characters long';
  } else {
    error_message.value = '';
  }
}

const handleSignup = async () => {
  try {
    if (error_message.value || !email.value) return;
    const response = await useCustomFetch('auth/signup/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        first_name: first_name.value,
        last_name: last_name.value,
      }),
    });
    
    if (response.code === 200 || response.code === 201) {
      userStore.login(
        response.data.user.id,
        response.data.token,
        response.data.user.first_name,
        response.data.user.last_name
      );
      navigateTo(localePath('/dashboard'))
    }
  } catch (error_obj) {
    error_message.value = "Error while creating account. Please try again.";
  }
};

const validateTurnstile = async () => {
  try {
    const { data, error } = await useFetch('/_turnstile/validate', {
      method: 'POST',
      body: { token: token }
    });

    if (error) {
      error_message.value = 'Validation failed. Please try again.';
    } else {
      console.log('Validation successful: ' + data.value.message);
    }
  } catch (err) {
    error_message.value = 'Error: ' + err.message;
  }
};
</script>