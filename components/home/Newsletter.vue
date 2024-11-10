<template>
    <section class="bg-white dark:bg-gray-900 mt-4">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-md sm:text-center">
                <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                    Get Your Free Higher Education Success Guide
                </h2>
                <p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
                    Join thousands of ambitious students who receive our weekly insights on:
                    <span class="block mt-4">
                        ✓ Scholarship opportunities worth $10,000+ <br>
                        ✓ Exclusive university admission tips <br>
                        ✓ Career guidance from industry experts <br>
                        ✓ Study abroad programs and internships
                    </span>
                </p>
                <form action="#">
                    <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                        <div class="relative w-full">
                            <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Email address
                            </label>
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                            </div>
                            <input 
                                v-model="email" 
                                type="email"
                                id="email"
                                required
                                @blur="validateEmail"
                                class="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-gray-200 
                                       sm:rounded-none sm:rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                       dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400
                                       transition-all duration-300 ease-in-out hover:border-blue-400 h-[50px]"
                                placeholder="Enter your email for instant access"
                            >
                        </div>
                        <div>
                            <button
                                type="submit"
                                @click.prevent="subscribe"
                                class="py-3 px-6 w-full text-sm font-bold text-white text-center rounded-lg
                                       bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                                       border-0 cursor-pointer sm:rounded-none sm:rounded-r-lg
                                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                       focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
                                       transition-all duration-300 ease-in-out h-[50px]"
                            >
                                Get Free Access Now
                            </button>
                        </div>
                    </div>
                    <NuxtTurnstile v-if="error=='' && email.length>3" class="py-3 px-7 mb-6 ml-8" v-model="token" />
                    <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                        <span class="font-medium">🔒 100% Secure.</span> No spam ever. Unsubscribe anytime. 
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Privacy Policy
                        </a>
                    </div>
                    <p class="text-red-500 text-sm" v-if="error">{{ error }}</p>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>

const email = ref('');
const error = ref('');
const token = ref('');

    const subscribe = async () => {
        validateTurnstile();
        if (error.value == '' && email.value.length>3){
        try {
            
            const response = await useCustomFetch('marketing/newsletter/subscribe/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                }),
            });
            //console.log(response);
            error.value = '';
        } catch (error_message) {
            //console.log("Error");
            error.value = 'Invalid email or already subscribed';
        }}
};

watch(email, (newValue, oldValue) => {
  console.log(newValue); // Log the current value for debugging

  if (newValue.length === 0){
    error.value = ''; // Clear error if there is no input
    return; // Exit early if the email is empty
  }

  // Validate the email format
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newValue)) {
    error.value = 'Please enter a valid email address'; // Set error if email is invalid
  } else {
    error.value = ''; // Clear error if email is valid
  }
});


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
      error.value = '';
    }
  } catch (err) {
    error.value = 'Error: ' + err.message;
  }
};
</script>