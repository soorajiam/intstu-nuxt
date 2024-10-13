<template>
  <section class="py-24 md:py-32 " style=" background-position: center;">
    <div class="container px-4 mx-auto">
      <div class="max-w-sm mx-auto">
        <div class="mb-6 text-center">
          <a class="inline-block mb-6" href="#">
            <img class="h-16" src="" alt="">
          </a>
          <h3 class="mb-4 text-2xl md:text-3xl font-bold">Sign up for your free account</h3>
          <p class="text-lg text-coolGray-500 font-medium">Well begun.. is half done</p>
        </div>
        <form action="">
          <div class="mb-6">
            <label class="block mb-2 font-medium" for="">Email</label>
            <input
            v-model="email"
            @blur="validateEmail"
            required
              class="appearance-none block w-full p-3 leading-5 dark:text-black border border-coolGray-200 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 "
              type="email" placeholder="name@intstu.com">
          </div>
          <div class="mb-4">
            <label class="block mb-2  font-medium" for="">Password</label>
            <input
            v-model="password"
            required
              class="appearance-none block w-full p-3 leading-5 dark:text-black border border-coolGray-200 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="password" placeholder="************">
          </div>
          <p class="text-red-500 text-sm" v-if="error_message">{{ error_message }}</p>
          <div class="flex flex-wrap items-center justify-between mb-6">
            <div class="w-full md:w-1/2">
              <label class="relative inline-flex items-center">
                <input class="form-checkbox appearance-none" type="checkbox">
                <!-- <img class="absolute top-1/2 transform -translate-y-1/2 left-0" src="flex-ui-assets/elements/sign-up/checkbox-icon.svg" alt=""> -->
                <span class="ml-7 text-xs text-coolGray-800 font-medium">Remember me</span>
              </label>
            </div>
            
            <div class="w-full md:w-auto mt-1"><a
                class="cursor-pointer inline-block text-xs font-medium text-blue-500 hover:text-blue-600" href="#">
                Forgot your password?</a></div>
          </div>
          <NuxtTurnstile v-if="password.length>2" class="py-3 px-7 mb-6" v-model="token" />
          <a class=" cursor-pointer inline-block py-3 px-7 mb-6 w-full text-base text-blue-50 font-medium text-center leading-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm"
           @click="handleSupaBaseSignup">Sign up</a>
          <p class="text-center">
            <span class="text-xs font-medium">Already have an account? </span>
            <NuxtLink class="ml-2 inline-block text-xs font-medium text-blue-500 hover:text-blue-600 hover:underline"
              :to="localePath('/auth/login/')">Sign In</NuxtLink>
          </p>
        </form>
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
const client = useSupabaseClient()
const handleSupaBaseSignup = async () => {
  validateTurnstile();
  if (error_message.value || !email.value) {
    console.error('Error:', error_message.value)
    return
  }
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.error('Error:', error.message)
    error_message.value = error.message
  } else {
    console.log('User:', data.user)
    console.log('Session:', data.session)
    userStore.login(data.user.id, data.session.access_token);
    // handleSignup();
    navigateTo('/dashboard');
  }
};

const handleSignup = async () => {



  try {
    // validateTurnstile();
    if (error_message.value || !email.value) return;
    const response = await useCustomFetch('accounts/signup/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        supabase_id: userStore.getUser(),
      }),
    });
    //console.log(response);
    if (response.code === 200 || response.code === 201) {
      // Redirect to dashboard
      //console.log('adding data to store')
      userStore.server_login(
        response.data.id,
        response.data.token
      );
      
      navigateTo(localePath('/dashboard'))
    }
  } catch (error_obj) {
    error_message.value = "Error while user creation"
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
      console.log( 'Validation successful: ' + data.value.message);
    }
  } catch (err) {
    error_message.value = 'Error: ' + err.message;
  }
};

</script>