<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <img class="h-12 mx-auto" src="/images/logo/intstu_logo.png" alt="Intstu Logo">
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to continue your educational journey
        </p>
      </div>

      <div class="mt-8">
        <!-- Google Sign In -->
        <button class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <img src="" alt="Google" class="w-5 h-5">
          <span class="text-gray-700 dark:text-gray-300 font-medium">Continue with Google</span>
        </button>

        <div class="mt-6 relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with email</span>
          </div>
        </div>

        <form class="mt-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="email">
              Email address
            </label>
            <input
              v-model="email"
              @blur="validateEmail"
              id="email"
              type="email"
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
              id="password"
              type="password"
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
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <p v-if="error_message" class="text-red-500 text-sm mb-4">{{ error_message }}</p>
            <NuxtTurnstile v-if="password.length>2" v-model="token" class="mb-4" />
            
            <button
              type="button"
              @click="handleLogin"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <NuxtLink
            to="/auth/signup"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up now
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  auth: false
});

import { useUserStore } from '~/store/userStore';
import {useRouter} from '#app';

const router = useRouter();
const userStore = useUserStore();

const turnstile_validated = ref(false);
const email = ref('');
const password = ref('');
const error_message = ref('');
const token = ref('');

function validateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    error_message.value = '';
  } else {
    error_message.value = 'Please enter a valid email address';
  }
}

const handleLogin = async () => {
  try {
    validateTurnstile();
    if (error_message.value || !email.value) return;
    const response = await useCustomFetch('auth/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    if (response.code === 200 || response.code === 201) {
      userStore.login(
        response.data.user.id,
        response.data.token,
        response.data.user.first_name,
        response.data.user.last_name
      );
      navigateTo('/dashboard')
    }
  } catch (error_obj) {
    error_message.value = "Error while user login"
  }
};

const validateTurnstile = async () => {
  try {
    const { data, error } = await useFetch('/_turnstile/validate', {
      method: 'POST',
      body: { token: token }
    });

    if (error.value) {
      error.value = 'Validation failed. Please try again.';
      turnstile_validated.value = false;
    } else {
      console.log('Validation successful: ' + data.value.message);
      turnstile_validated.value = true;
      error_message.value = '';
    }
  } catch (err) {
    error.value = 'Error: ' + err.message;
    turnstile_validated.value = false;
  }
};
</script>