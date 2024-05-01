<script setup>
</script>

<template>
<section class="pb-32 md:pb-64 bg-gray-100 w-full absolute z-100">
  <div class="container mx-auto px-4">
    <div class="relative mb-16 py-16 px-8 max-w-xl mx-auto bg-white rounded-b-3xl">
      <svg class="absolute top-0 -left-6" width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1440" height="992" transform="translate(-424)" fill="#F3F4F6"></rect>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 24C24 10.7452 13.2548 0 0 0H24H91H501H568H592C578.745 0 568 10.7452 568 24V162C568 175.255 557.255 186 544 186H48C34.7452 186 24 175.255 24 162V24Z" fill="white"></path>
      </svg>
      <svg class="absolute top-0 -right-6" width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1440" height="992" transform="translate(-992)" fill="#F3F4F6"></rect>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M-544 24C-544 10.7452 -554.745 0 -568 0H-544H-477H-67H0H24C10.7452 0 0 10.7452 0 24V162C0 175.255 -10.7452 186 -24 186H-520C-533.255 186 -544 175.255 -544 162V24Z" fill="white"></path>
      </svg>
      <!-- <img class="mx-auto" src="zanrly-assets/logos/zanrly-logo-xl.svg" alt=""> -->
    </div>
    <div class="md:max-w-md mx-auto">
      <div class="mb-10 text-center">
        <h2 class="font-heading mb-4 text-4xl md:text-5xl text-black font-black tracking-tight">Welcome Back</h2>
        <p class="text-gray-500 font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada tellus vestibulum, commodo pulvinar.</p>
      </div>
      <form>
        <div class="flex flex-wrap -m-3">
          <div class="w-full p-3">
            <label class="block mb-2 text-sm text-gray-500 font-bold" for="signInLightReverseInput2-1">Email Address</label>
            <input class="appearance-none px-6 py-3.5 w-full text-lg text-gray-500 font-bold bg-white placeholder-gray-500 outline-none border border-gray-200 focus:ring-4 focus:ring-blue-200 rounded-full" id="signInLightReverseInput2-1" type="email" placeholder="Enter email address">
          </div>
          <div class="w-full p-3">
            <label class="block mb-2 text-sm text-gray-500 font-bold" for="signInLightReverseInput2-2">Password</label>
            <div class="border border-gray-200 overflow-hidden rounded-full focus-within:ring-4 focus-within:ring-blue-200">
              <div class="flex flex-wrap">
                <div class="flex-1">
                  <input class="appearance-none px-6 py-3.5 w-full text-lg text-gray-500 font-bold bg-white placeholder-gray-500 outline-none" id="signInLightReverseInput2-2" type="password" placeholder="*************">
                </div>
                <div class="w-auto"><a class="flex items-center pr-4 text-blue-500 hover:text-blue-600 h-full bg-white font-bold" href="#">Forgot password?</a></div>
              </div>
            </div>
          </div>
          <div class="w-full p-3">
            <div class="flex flex-wrap md:justify-end -m-2">
              <div class="w-full p-2"><a class="block px-8 py-3.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full" href="#">Sign In</a></div>
            </div>
          </div>
          <div class="w-full p-3">
            <p class="text-gray-600 text-center font-bold">
              <span>Don’t have an account?</span>
              <a class="text-blue-500 hover:text-blue-600 font-bold" href="#">Create free account</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
  </template>