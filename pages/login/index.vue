<template>
    <section class="py-24 md:py-32 " style=" background-position: center;">
      <div class="container px-4 mx-auto">
        <div class="max-w-sm mx-auto">
          <div class="mb-6 text-center">
            <a class="inline-block mb-6" href="#">
              <img class="h-16" src="/images/logo/intstu_logo.png" alt="">
            </a>
            <h3 class="mb-4 text-2xl md:text-3xl font-bold">Sign up for your free account</h3>
            <p class="text-lg text-coolGray-500 font-medium">Well begun.. is half done</p>
          </div>
          <form action="">
            <div class="mb-6">
              <label class="block mb-2 font-medium" for="">Email</label>
              <input class="appearance-none block w-full p-3 leading-5 dark:text-black border border-coolGray-200 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 " type="email" placeholder="dev@shuffle.dev">
            </div>
            <div class="mb-4">
              <label class="block mb-2  font-medium" for="">Password</label>
              <input class="appearance-none block w-full p-3 leading-5 dark:text-black border border-coolGray-200 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="password" placeholder="************">
            </div>
            <div class="flex flex-wrap items-center justify-between mb-6">
              <div class="w-full md:w-1/2">
                <label class="relative inline-flex items-center">
                  <input class="form-checkbox appearance-none" type="checkbox">
                  <!-- <img class="absolute top-1/2 transform -translate-y-1/2 left-0" src="flex-ui-assets/elements/sign-up/checkbox-icon.svg" alt=""> -->
                  <span class="ml-7 text-xs text-coolGray-800 font-medium">Remember me</span>
                </label>
              </div>
              <div class="w-full md:w-auto mt-1"><a class="inline-block text-xs font-medium text-blue-500 hover:text-blue-600" href="#">Forgot your password?</a></div>
            </div>
            <a class="inline-block py-3 px-7 mb-6 w-full text-base text-blue-50 font-medium text-center leading-6 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm" href="#">Sign In</a>
            <p class="text-center">
              <span class="text-xs font-medium">Don't have an account? </span>
              <NuxtLink class="ml-2 inline-block text-xs font-medium text-blue-500 hover:text-blue-600 hover:underline" :to="localePath('/login/signup')">Sign Up</NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </section>
    </template>
    
    <script setup>
    
    const localePath = useLocalePath();
    </script>