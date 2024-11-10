<template>
    <section class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div class="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-12 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div class="place-self-center mr-auto mb-10 lg:col-span-7 xl:col-span-8 xl:mb-0">
                <span class="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-200 mb-4 inline-block">Your Future Starts Here</span>
                <h1 class="mb-4 max-w-2xl text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Find Your Perfect University Match</h1>
                <p class="mb-6 max-w-2xl text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300">Compare thousands of universities, read authentic reviews, and connect with current students. Make an informed decision about your higher education journey with personalized recommendations.</p>
                <div class="flex flex-wrap gap-4">
                    <a href="#" class="inline-flex items-center py-3 px-5 font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                        Get Started Free
                    </a>
                    <a href="#" class="inline-flex items-center py-3 px-5 font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 00 14 8v4a1 1 0 00 .553.894l2 1A1 1 0 00 18 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                        Watch How It Works
                    </a>
                </div>
                <ul class="hidden xl:flex justify-between pt-8 mt-16 border-t border-gray-200/60 dark:border-gray-700/60">
                    <li class="flex items-center group transition-transform hover:transform hover:translate-y-[-2px]">
                        <span class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">{{$t('home.hero.institution_count')}}</span>
                        <div class="block pl-5 text-lg">
                            <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Universities</div>
                            <div class="text-gray-500 dark:text-gray-400">Worldwide Network</div>
                        </div>
                    </li>
                    <li class="flex items-center group transition-transform hover:transform hover:translate-y-[-2px]">
                        <span class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">{{$t('home.hero.courses_count')}}</span>
                        <div class="block pl-5 text-lg">
                            <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Programs</div>
                            <div class="text-gray-500 dark:text-gray-400">To Choose From</div>
                        </div>
                    </li>
                    <li class="flex items-center group transition-transform hover:transform hover:translate-y-[-2px]">
                        <span class="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">{{$t('home.hero.student_count')}}</span>
                        <div class="block pl-5 text-lg">
                            <div class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Students</div>
                            <div class="text-gray-500 dark:text-gray-400">Found Their Path</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="justify-center p-4 max-w-screen-sm bg-white rounded-lg border border-gray-200 shadow lg:mt-0 lg:col-span-5 xl:col-span-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6" action="">
                    <h2 class="text-xl font-medium text-gray-900 dark:text-white">Login to your account</h2>
                   
                    <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                      <input
                        v-model="email"
                        @blur="validateEmail"
                        type="email"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@intstu.com"
                        required
                      >
                    </div>
                    <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                      <input
                        v-model="password"
                        type="password"
                        name="password"
                        id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••"
                        required
                      >
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <p class="text-red-500 text-sm" v-if="error_message">{{ error_message }}</p>
                    <NuxtTurnstile v-if="password.length > 2" class="py-3 px-7 mb-2" v-model="token" />
                    <a
                      class="cursor-pointer inline-block py-3 px-7 mb-2 w-full text-base text-blue-50 font-medium text-center leading-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm"
                      @click="handleLogin"
                    >
                      Sign In
                    </a>
                    <div class="text-center mt-6">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Not a member yet?</p>
                        <p class="text-base font-medium mb-3">Join thousands of students and educators!</p>
                        <NuxtLink
                            class="inline-block text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-6 py-2.5 rounded-full transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                            to="/auth/signup">
                            Create Free Account
                        </NuxtLink>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">No credit card required</p>
                    </div>
                </form>
            </div>                
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import { useRouter } from '#app';
const router = useRouter();
const userStore = useUserStore();
const client = useSupabaseClient();
const localePath = useLocalePath();

const email = ref('');
const password = ref('');
const token = ref('');
const error_message = ref('');

const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        error_message.value = '';
    } else {
        error_message.value = 'Please enter a valid email address';
    }
};

const validateTurnstile = async () => {
    try {
        const { data, error } = await useFetch('/_turnstile/validate', {
            method: 'POST',
            body: { token: token.value }
        });

        if (error.value) {
            error_message.value = 'Validation failed. Please try again.';
        } else {
            console.log('Validation successful: ' + data.value.message);
        }
    } catch (err) {
        error_message.value = 'Error: ' + err.message;
    }
};

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
            navigateTo('/dashboard');
        }
    } catch (error_obj) {
        error_message.value = "Error while user login";
    }
};
</script>
