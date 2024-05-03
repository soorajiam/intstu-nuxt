<template>
            <section class="bg-gray-50 dark:bg-gray-900">
    <div class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-12 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="place-self-center mr-auto mb-10 lg:col-span-7 xl:col-span-8 xl:mb-0">
            <h1 class="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{{ $t('home.hero.heading') }}</h1>
            <p class="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{{ $t('home.hero.description')}}</p>
            <a href="#" class="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                Watch video
            </a>
            <ul class="hidden justify-between pt-12 mx-auto mt-14 border-t border-gray-300 xl:flex dark:border-gray-700 dark:text-white">
                <li class="flex">
                    <span class="text-4xl font-extrabold lg:text-5xl">{{$t('home.hero.institution_count')}}</span>
                    <div class="block pl-4 text-xl text-gray-500 dark:text-gray-400">
                        <div>Total</div>
                        <div>{{$t('home.hero.institution_count_description')}}</div>
                        
                    </div>
                </li>
                <li class="flex">
                    <span class="text-4xl font-extrabold lg:text-5xl">{{$t('home.hero.courses_count')}}</span>
                    <div class="block pl-4 text-xl text-gray-500 dark:text-gray-400">
                        <div>Over</div>
                        <div>{{$t('home.hero.courses_count_description')}}</div>
                    </div>
                </li>
                <li class="flex">
                    <span class="text-4xl font-extrabold lg:text-5xl">{{$t('home.hero.student_count')}}</span>
                    <div class="block pl-4 text-xl text-gray-500 dark:text-gray-400">
                        <div>Growing</div>
                        <div>{{$t('home.hero.student_count_description')}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="justify-center p-4 max-w-screen-sm bg-white rounded-lg border border-gray-200 shadow lg:mt-0 lg:col-span-5 xl:col-span-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" action="#">
                <h2 class="text-xl font-medium text-gray-900 dark:text-white">{{$t('home.hero.cta_hook')}}</h2>
               
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                  <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@intstu.com" required="">
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                  <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="">
                </div>
                <div class="flex items-start">
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                      </div>
                  </div>
                  <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                </div>
                <NuxtTurnstile v-if="password.length>2" class="py-3 px-7 mb-6" v-model="token" />
                <div class="text-sm text-red-500 dark:text-red-400">{{ error_message }}</div>
                <button @click.prevent="handleSupaBaseSignup" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-700">Create an account</button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already a memeber? <a :href="localePath('/auth/login')"  class="text-blue-700 hover:underline dark:text-blue-500">Log In</a>
                </div>
            </form>
        </div>                
    </div>
</section>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
const userStore = useUserStore();
const client = useSupabaseClient()
const localePath = useLocalePath();

const password = ref('');
const email = ref('');
const token = ref('');
const error_message = ref('');

const validateTurnstile = async () => {
  try {
    const { data, error } = await useFetch('/_turnstile/validate', {
      method: 'POST',
      body: { token: token }
    });

    if (error.value) {
      error.value = 'Validation failed. Please try again.';
    } else {
      console.log( 'Validation successful: ' + data.value.message);
    }
  } catch (err) {
    error.error_message = 'Error: ' + err.message;
  }
};




function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      error_message.value = '';
    } else {
      error_message.value = 'Please enter a valid email address';
    }
}


const handleSupaBaseSignup = async () => {
    error_message.value = '';
  validateTurnstile();
  validateEmail()
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
    navigateTo(localePath('/dashboard'));
  }
};
</script>
